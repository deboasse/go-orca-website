"use client";

import { useMemo, useState } from "react";
import { z } from "zod";

async function insertLead(payload: Record<string, unknown>) {
  const res = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error ?? "Submission failed");
  }
}

const STEPS = [
  { key: "services", label: "Services", hint: "What to build" },
  { key: "business", label: "Business", hint: "About you" },
  { key: "scope", label: "Scope", hint: "Per service" },
  { key: "project", label: "Project", hint: "Goals & timing" },
  { key: "contact", label: "Contact", hint: "Send quote" },
] as const;

const businessTypes = ["Professional services", "Logistics & ops", "Real estate", "Health & wellness", "E-commerce / retail", "Construction / trades", "Education / coaching", "Other"];
const sizes = ["Just me", "2–10", "11–50", "51–200", "200+"];
const timelines = ["ASAP (this month)", "Next 1–3 months", "3–6 months", "Just exploring"];

const SERVICE_CATALOG = [
  { key: "crm", label: "Custom CRM" },
  { key: "app", label: "Custom App (web/mobile)" },
  { key: "product", label: "Product Development" },
  { key: "plugin", label: "Custom Plugin / Integration" },
  { key: "unsure", label: "Not sure yet, advise me" },
] as const;
type ServiceKey = (typeof SERVICE_CATALOG)[number]["key"];

const SCOPE_OPTIONS: Record<Exclude<ServiceKey, "unsure">, readonly string[]> = {
  crm: ["Pipelines & deals", "Contact management", "Shared inbox", "Tasks & reminders", "Reports & forecasting", "Roles & permissions"],
  app: ["Internal tool / admin panel", "Client portal", "Mobile app (iOS/Android)", "Real-time dashboard", "Auth & billing", "File uploads / storage"],
  product: ["Discovery & scoping", "UX / UI design", "MVP build", "Full product launch", "QA & deployment", "Post-launch iteration"],
  plugin: ["WordPress plugin", "Shopify app", "Chrome extension", "Webhook integration", "API design", "Workflow automation"],
};

const schema = z.object({
  business_type: z.string().min(1, "Pick a business type").max(100),
  business_size: z.string().min(1, "Pick a team size").max(50),
  current_tools: z.string().trim().max(500).optional().or(z.literal("")),
  pain_points: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000),
  goals: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000),
  timeline: z.string().min(1, "Pick a timeline").max(50),
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});
type FormState = z.infer<typeof schema>;

const initial: FormState = { business_type: "", business_size: "", current_tools: "", pain_points: "", goals: "", timeline: "", name: "", email: "", company: "", role: "", notes: "" };

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [servicesNeeded, setServicesNeeded] = useState<ServiceKey[]>([]);
  const [scope, setScope] = useState<Record<string, string[]>>({});
  const [scopeText, setScopeText] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const scopedServices = useMemo(() => servicesNeeded.filter((k): k is Exclude<ServiceKey, "unsure"> => k !== "unsure"), [servicesNeeded]);
  const visibleSteps = useMemo(() => (scopedServices.length === 0 ? STEPS.filter((s) => s.key !== "scope") : [...STEPS]), [scopedServices.length]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => { const { [key]: _, ...rest } = e; return rest; });
  };

  const setServiceScope = (svc: string, items: string[]) => {
    setScope((prev) => ({ ...prev, [svc]: items }));
    setErrors((e) => { const { [`scope_${svc}`]: _, ...rest } = e; return rest; });
  };

  const currentStepKey = visibleSteps[step]?.key;

  const validateStep = (): boolean => {
    if (currentStepKey === "services") {
      if (servicesNeeded.length === 0) { setErrors({ services: "Pick at least one service to continue" }); return false; }
      setErrors({}); return true;
    }
    if (currentStepKey === "scope") {
      const next: Record<string, string> = {};
      for (const svc of scopedServices) {
        if (svc === "crm") { if ((scopeText[svc] ?? "").trim().length < 10) next[`scope_${svc}`] = "Tell us a bit more (10+ characters)"; }
        else { if (!scope[svc] || scope[svc].length === 0) next[`scope_${svc}`] = "Pick at least one item"; }
      }
      setErrors(next); return Object.keys(next).length === 0;
    }
    const stepFields: Record<string, (keyof FormState)[]> = { business: ["business_type", "business_size"], project: ["pain_points", "goals", "timeline"], contact: ["name", "email"] };
    const fields = stepFields[currentStepKey ?? ""] ?? [];
    const result = schema.safeParse(data);
    if (result.success) return true;
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) { const f = issue.path[0] as keyof FormState; if (fields.includes(f) && !fieldErrors[f]) fieldErrors[f] = issue.message; }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const next = () => { if (!validateStep()) return; setStep((s) => Math.min(s + 1, visibleSteps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = (i: number) => { if (i === step) return; if (i < step) return setStep(i); if (i === step + 1) { if (!validateStep()) return; setStep(i); } };

  const submit = async () => {
    if (!validateStep()) return;
    const parsed = schema.safeParse(data);
    if (!parsed.success) { const fe: Record<string, string> = {}; for (const i of parsed.error.issues) { const f = i.path[0] as string; if (!fe[f]) fe[f] = i.message; } setErrors(fe); return; }
    setSubmitting(true); setSubmitError(null);
    const serviceLabels = servicesNeeded.map((k) => SERVICE_CATALOG.find((s) => s.key === k)?.label).filter(Boolean) as string[];
    const scopeSummary = scopedServices.map((k) => { const label = SERVICE_CATALOG.find((s) => s.key === k)?.label ?? k; if (k === "crm") { const txt = (scopeText[k] ?? "").trim(); return txt ? `• ${label}:\n  ${txt}` : null; } const items = scope[k] ?? []; return items.length ? `• ${label}: ${items.join(", ")}` : null; }).filter(Boolean).join("\n");
    const composedNotes = [serviceLabels.length ? `Services needed: ${serviceLabels.join(", ")}` : null, scopeSummary ? `Scope:\n${scopeSummary}` : null, parsed.data.notes || null].filter(Boolean).join("\n\n") || null;
    try {
      await insertLead({ name: parsed.data.name, email: parsed.data.email, company: parsed.data.company || null, role: parsed.data.role || null, business_type: parsed.data.business_type, business_size: parsed.data.business_size, current_tools: parsed.data.current_tools || null, pain_points: parsed.data.pain_points, goals: parsed.data.goals, timeline: parsed.data.timeline, notes: composedNotes });
      setSubmitted(true);
    } catch { setSubmitError("Something went wrong. Please try again or email us directly."); }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-surface p-10 ring-glow">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">Received ✓</div>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">Talk soon, {data.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-muted-foreground">We&apos;ve got your details. A founder will review your answers and come back within one business day with a custom quote shaped to your business.</p>
      </div>
    );
  }

  const current = visibleSteps[step];
  const progress = ((step + 1) / visibleSteps.length) * 100;

  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-10">
      {/* Stepper */}
      <ol className="flex flex-wrap items-center gap-2 md:gap-3">
        {visibleSteps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          const clickable = i <= step + 1;
          return (
            <li key={s.key} className="flex items-center gap-2 md:gap-3">
              <button type="button" onClick={() => clickable && goTo(i)} disabled={!clickable}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${state === "active" ? "border-primary bg-primary/10 text-primary" : state === "done" ? "border-border-strong text-foreground/80 hover:border-primary/40" : "border-border text-muted-foreground"} ${clickable ? "cursor-pointer" : "cursor-not-allowed"}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${state === "active" ? "bg-primary text-primary-foreground" : state === "done" ? "bg-primary/80 text-primary-foreground" : "bg-border text-muted-foreground"}`}>
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className="font-medium">{s.label}</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:inline">{s.hint}</span>
              </button>
              {i < visibleSteps.length - 1 && <span className="hidden h-px w-4 bg-border md:block" />}
            </li>
          );
        })}
      </ol>

      {/* Progress */}
      <div className="mb-8 mt-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>Step {step + 1} / {visibleSteps.length} · {current.label}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      {currentStepKey === "services" && (
        <StepShell title="What do you need built?" subtitle="Pick everything that applies, we'll tailor the next steps to each one.">
          <MultiPills label="Services you're interested in" options={SERVICE_CATALOG.map((s) => s.label)} values={servicesNeeded.map((k) => SERVICE_CATALOG.find((s) => s.key === k)!.label)}
            onChange={(labels) => { const keys = labels.map((l) => SERVICE_CATALOG.find((s) => s.label === l)?.key).filter(Boolean) as ServiceKey[]; setServicesNeeded(keys); if (keys.length > 0) setErrors((e) => { const { services: _, ...rest } = e; return rest; }); }} />
          {errors.services && <p className="-mt-3 text-xs text-destructive">{errors.services}</p>}
        </StepShell>
      )}

      {currentStepKey === "business" && (
        <StepShell title="Tell us about your business" subtitle="So we can shape the right solution around it.">
          <Pills label="What kind of business?" options={businessTypes} value={data.business_type} onChange={(v) => set("business_type", v)} error={errors.business_type} />
          <Pills label="How big is your team?" options={sizes} value={data.business_size} onChange={(v) => set("business_size", v)} error={errors.business_size} />
          <Field label="What tools do you use today? (optional)" placeholder="Spreadsheets, HubSpot, WhatsApp, email…" value={data.current_tools || ""} onChange={(v) => set("current_tools", v)} error={errors.current_tools} />
        </StepShell>
      )}

      {currentStepKey === "scope" && (
        <StepShell title="Scope each service" subtitle="Tell us exactly what you need, this drives a sharper quote.">
          {scopedServices.map((svc) => {
            const meta = SERVICE_CATALOG.find((s) => s.key === svc)!;
            const isText = svc === "crm";
            return (
              <div key={svc} className="rounded-xl border border-border bg-background/40 p-5">
                <h4 className="text-base font-semibold">{meta.label}</h4>
                {isText ? (
                  <TextArea label="Describe what you need in your CRM" placeholder="E.g. We need a pipeline for property leads, automatic follow-ups by SMS, a shared inbox for the team…" value={scopeText[svc] ?? ""} onChange={(v) => { setScopeText((prev) => ({ ...prev, [svc]: v })); setErrors((e) => { const { [`scope_${svc}`]: _, ...rest } = e; return rest; }); }} rows={5} />
                ) : (
                  <MultiPills label="What do you need?" options={SCOPE_OPTIONS[svc as Exclude<ServiceKey, "unsure" | "crm">]} values={scope[svc] ?? []} onChange={(v) => setServiceScope(svc, v)} />
                )}
                {errors[`scope_${svc}`] && <p className="mt-3 text-xs text-destructive">{errors[`scope_${svc}`]}</p>}
              </div>
            );
          })}
        </StepShell>
      )}

      {currentStepKey === "project" && (
        <StepShell title="Tell us about the project" subtitle="The clearer you are, the sharper our quote.">
          <TextArea label="What's the biggest problem today?" placeholder="Leads slip through email, customer info lives in 4 places…" value={data.pain_points} onChange={(v) => set("pain_points", v)} error={errors.pain_points} rows={3} />
          <TextArea label="What would success look like?" placeholder="One dashboard for our whole pipeline, automatic reminders, a portal for clients…" value={data.goals} onChange={(v) => set("goals", v)} error={errors.goals} rows={3} />
          <Pills label="When would you like to start?" options={timelines} value={data.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline} />
          <TextArea label="Anything else we should know? (optional)" placeholder="Integrations you need, specific deadlines…" value={data.notes || ""} onChange={(v) => set("notes", v)} error={errors.notes} rows={2} />
        </StepShell>
      )}

      {currentStepKey === "contact" && (
        <StepShell title="Where do we send your quote?" subtitle="A real founder will reach out, usually within one business day.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" required value={data.name} onChange={(v) => set("name", v)} error={errors.name} />
            <Field label="Work email" type="email" required value={data.email} onChange={(v) => set("email", v)} error={errors.email} />
            <Field label="Company (optional)" value={data.company || ""} onChange={(v) => set("company", v)} error={errors.company} />
            <Field label="Your role (optional)" value={data.role || ""} onChange={(v) => set("role", v)} error={errors.role} />
          </div>
          {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}
        </StepShell>
      )}

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
        <button type="button" onClick={back} disabled={step === 0 || submitting} className="btn-base btn-secondary btn-sm">← Back</button>
        {step < visibleSteps.length - 1 ? (
          <button type="button" onClick={next} className="btn-base btn-primary btn-sm ring-glow">Continue →</button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className="btn-base btn-primary btn-sm ring-glow">
            {submitting ? "Sending…" : "Get my custom quote →"}
          </button>
        )}
      </div>
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-7">
      <div><h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{subtitle}</p></div>
      {children}
    </div>
  );
}

function Pills({ label, options, value, onChange, error }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div>
      <label className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${value === opt ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/80 hover:border-border-strong"}`}>
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function MultiPills({ label, options, values, onChange }: { label: string; options: readonly string[]; values: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  return (
    <div>
      <label className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${values.includes(opt) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/80 hover:border-border-strong"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required, error }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4, error }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; error?: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
