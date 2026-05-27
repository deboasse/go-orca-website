import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";

// ── HTML escaping ─────────────────────────────────────────────────────────────
// All user-supplied fields are escaped before being placed in email HTML.
// Prevents XSS in email clients that render raw HTML (rare but real).
function h(s: string | null | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Field length limits ───────────────────────────────────────────────────────
const LIMITS: Record<string, number> = {
  name:          200,
  email:         254,
  company:       200,
  role:          200,
  business_type: 200,
  business_size: 100,
  current_tools: 1_000,
  pain_points:   5_000,
  goals:         5_000,
  timeline:      100,
  notes:         5_000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Lazy-init DB (no build-time evaluation) ───────────────────────────────────
function getSql() {
  const url =
    process.env.GO_ORCA_DB_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.POSTGRES_URL;
  if (!url) throw new Error("No DB URL configured");
  return neon(url);
}
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM          = process.env.RESEND_FROM_EMAIL ?? "Go-Orca <hello@go-orca.tech>";
const NOTIFY_EMAIL  = "hello@go-orca.tech";
const MAX_BODY_BYTES = 32_000; // 32 KB — more than enough for a quote form

async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name           text NOT NULL,
      email          text NOT NULL,
      company        text,
      role           text,
      business_type  text,
      business_size  text,
      current_tools  text,
      pain_points    text,
      goals          text,
      timeline       text,
      notes          text,
      source         text NOT NULL DEFAULT 'website',
      status         text NOT NULL DEFAULT 'new',
      created_at     timestamptz NOT NULL DEFAULT now(),
      updated_at     timestamptz NOT NULL DEFAULT now()
    )
  `;
}

export async function POST(req: Request) {
  // ── 1. Body size guard ────────────────────────────────────────────────────
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  // ── 2. Parse ──────────────────────────────────────────────────────────────
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ── 3. Coerce fields to strings, enforce length limits ────────────────────
  function field(key: string): string | null {
    const v = raw[key];
    if (v == null || v === "") return null;
    if (typeof v !== "string") return null;
    const max = LIMITS[key] ?? 500;
    return v.trim().slice(0, max) || null;
  }

  const name          = field("name");
  const email         = field("email");
  const company       = field("company");
  const role          = field("role");
  const business_type = field("business_type");
  const business_size = field("business_size");
  const current_tools = field("current_tools");
  const pain_points   = field("pain_points");
  const goals         = field("goals");
  const timeline      = field("timeline");
  const notes         = field("notes");

  // ── 4. Validate required fields ───────────────────────────────────────────
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  // ── 5. Save lead (critical — form fails if DB fails) ──────────────────────
  try {
    await ensureTable();
    const sql = getSql();
    await sql`
      INSERT INTO leads
        (name, email, company, role, business_type, business_size,
         current_tools, pain_points, goals, timeline, notes)
      VALUES
        (${name}, ${email}, ${company}, ${role}, ${business_type}, ${business_size},
         ${current_tools}, ${pain_points}, ${goals}, ${timeline}, ${notes})
    `;
  } catch (dbErr) {
    console.error("[/api/quote] DB error:", dbErr instanceof Error ? dbErr.message : dbErr);
    // Never expose DB internals to the client in production
    return NextResponse.json(
      { error: "Submission failed. Please try again or email us directly." },
      { status: 500 }
    );
  }

  // ── 6. Send emails (best-effort — lead is already saved) ─────────────────
  try {
    const resend = getResend();

    const { error: notifyErr } = await resend.emails.send({
      from: FROM,
      to: [NOTIFY_EMAIL],
      subject: `New quote request from ${h(name)}${company ? ` · ${h(company)}` : ""}`,
      html: notifyHtml({ name, email, company, role, business_type, business_size, timeline, pain_points, goals, notes }),
    });
    if (notifyErr) console.error("[/api/quote] Resend notify:", notifyErr.message);

    const { error: confirmErr } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "We received your quote request — Go-Orca.Tech",
      html: confirmHtml({ name }),
    });
    if (confirmErr) console.error("[/api/quote] Resend confirm:", confirmErr.message);
  } catch (emailErr) {
    console.error("[/api/quote] Email exception:", emailErr instanceof Error ? emailErr.message : emailErr);
  }

  return NextResponse.json({ ok: true });
}

// ── Email templates ───────────────────────────────────────────────────────────
// All user-supplied values are passed through h() before insertion into HTML.

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#94a3b8;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;padding-right:24px;">${label}</td>
      <td style="padding:8px 0;color:#f1f5f9;font-size:14px;">${h(value)}</td>
    </tr>`;
}

function notifyHtml(d: Record<string, string | null | undefined>) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#0f0f18;border:1px solid rgba(139,92,246,0.25);border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#8B5CF6,#06B6D4);padding:28px 36px;">
      <div style="font-size:11px;color:rgba(255,255,255,0.7);font-family:monospace;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;">New quote request</div>
      <div style="font-size:22px;font-weight:700;color:white;">${h(d.name)}${d.company ? `<span style="font-weight:400;opacity:0.7;font-size:16px;"> · ${h(d.company)}</span>` : ""}</div>
    </div>
    <div style="padding:32px 36px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Email", d.email ? `<a href="mailto:${h(d.email)}" style="color:#8B5CF6;">${h(d.email)}</a>` : null)}
        ${row("Role", d.role)}
        ${row("Business type", d.business_type)}
        ${row("Team size", d.business_size)}
        ${row("Timeline", d.timeline)}
        ${row("Current tools", d.current_tools)}
      </table>
      ${d.pain_points ? `<div style="margin-top:24px;border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;"><div style="font-size:11px;color:#8B5CF6;font-family:monospace;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Pain points</div><div style="color:#cbd5e1;font-size:14px;line-height:1.7;">${h(d.pain_points)}</div></div>` : ""}
      ${d.goals ? `<div style="margin-top:20px;"><div style="font-size:11px;color:#8B5CF6;font-family:monospace;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Goals</div><div style="color:#cbd5e1;font-size:14px;line-height:1.7;">${h(d.goals)}</div></div>` : ""}
      ${d.notes ? `<div style="margin-top:20px;"><div style="font-size:11px;color:#8B5CF6;font-family:monospace;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Notes</div><div style="color:#cbd5e1;font-size:14px;line-height:1.7;">${h(d.notes)}</div></div>` : ""}
      <a href="mailto:${h(d.email ?? "")}" style="display:block;margin-top:28px;background:linear-gradient(135deg,#8B5CF6,#06B6D4);color:white;text-decoration:none;text-align:center;padding:14px 24px;border-radius:8px;font-weight:600;font-size:15px;">Reply to ${h(d.name ?? "")} →</a>
    </div>
    <div style="padding:16px 36px;background:#080810;text-align:center;font-size:11px;color:#475569;font-family:monospace;">GO-ORCA.TECH · QUOTE SYSTEM</div>
  </div>
</body></html>`;
}

function confirmHtml({ name }: { name: string | null }) {
  const first = h((name ?? "").split(" ")[0]);
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#8B5CF6 0%,#06B6D4 100%);padding:36px 40px;">
      <div style="font-size:24px;font-weight:800;color:white;letter-spacing:-0.5px;">GO-ORCA</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;">go-orca.tech</div>
    </div>
    <div style="padding:40px;">
      <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 12px;">Got it, ${first}. 👋</h1>
      <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 24px;">We've received your quote request and a founder will personally review it. You'll hear back within <strong>one business day</strong> with a custom quote shaped to your business.</p>
      <p style="font-size:15px;color:#475569;line-height:1.7;margin:0;">In the meantime, feel free to reply to this email with any additional context.</p>
      <div style="margin-top:32px;padding:20px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
        <div style="font-size:11px;font-weight:700;color:#8B5CF6;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">What happens next</div>
        <div style="font-size:14px;color:#475569;line-height:1.8;">
          1. We review your answers<br>
          2. We prepare a custom quote and scope<br>
          3. We reach out to schedule a 20-min walkthrough
        </div>
      </div>
    </div>
    <div style="background:#0f172a;padding:24px 40px;text-align:center;">
      <div style="font-size:13px;color:#64748b;">GO-ORCA · go-orca.tech · Massachusetts, USA</div>
    </div>
  </div>
</body></html>`;
}
