import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const PRM = "https://go-orca.tech/.well-known/oauth-protected-resource";
const WWW_AUTH = `Bearer resource_metadata="${PRM}"`;

function err(code: string, message: string, status: number, extra?: Record<string, string>) {
  return NextResponse.json(
    { error: code, message, ...extra },
    { status, headers: status === 401 ? { "WWW-Authenticate": WWW_AUTH } : {} }
  );
}

function getSql() {
  const url =
    process.env.GO_ORCA_DB_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL;
  if (!url) throw new Error("No DB URL configured");
  return neon(url);
}

function checkAuth(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

const VALID_TOKEN = process.env.ADMIN_SESSION_TOKEN;

export async function GET(req: Request) {
  const token = checkAuth(req);
  if (!token) return err("unauthorized", "Authentication required. Obtain a credential via /api/agent/auth.", 401);
  if (!VALID_TOKEN || token !== VALID_TOKEN) return err("invalid_token", "Invalid or expired credential. Re-authenticate at /api/agent/auth.", 401);

  try {
    const sql = getSql();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);

    const leads = status
      ? await sql`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit}`
      : await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}`;

    return NextResponse.json({ leads, total: leads.length });
  } catch {
    return err("database_error", "Failed to fetch leads. Try again shortly.", 500);
  }
}

export async function PATCH(req: Request) {
  const token = checkAuth(req);
  if (!token) return err("unauthorized", "Authentication required. Obtain a credential via /api/agent/auth.", 401);
  if (!VALID_TOKEN || token !== VALID_TOKEN) return err("invalid_token", "Invalid or expired credential.", 401);

  let body: { id?: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return err("invalid_json", "Request body must be valid JSON.", 400);
  }

  if (!body.id) return err("missing_field", "'id' is required.", 400);

  const VALID_STATUSES = ["new", "contacted", "qualified", "converted", "closed"];
  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return err("invalid_value", `status must be one of: ${VALID_STATUSES.join(", ")}`, 400);
  }

  try {
    const sql = getSql();
    const updated = await sql`
      UPDATE leads SET
        status     = COALESCE(${body.status ?? null}, status),
        notes      = COALESCE(${body.notes ?? null}, notes),
        updated_at = now()
      WHERE id = ${body.id}
      RETURNING *
    `;
    if (!updated.length) return err("not_found", "Lead not found.", 404);
    return NextResponse.json(updated[0]);
  } catch {
    return err("database_error", "Failed to update lead. Try again shortly.", 500);
  }
}
