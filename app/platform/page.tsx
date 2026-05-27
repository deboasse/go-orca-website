import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Services — Custom CRM, Apps, Product Development & Plugins",
  description:
    "Four core services, one team: custom CRM, custom apps, product development, and custom plugins & integrations, all shaped to your business.",
};

const serviceCategories = [
  {
    n: "01", tag: "Core", t: "Custom CRM",
    d: "Stop running your business out of spreadsheets, inboxes and gut feel. We build a CRM that mirrors how your team actually sells and serves, so every lead, deal and customer lives in one place your team will actually use.",
    outcome: "Outcome: a single source of truth for revenue, faster follow-ups, fewer dropped leads, and a real forecast you can trust.",
    items: ["Pipeline modeled to your real sales stages", "360° contact & account timelines", "Shared inbox with SLAs & assignment rules", "Tasks, reminders & repeatable playbooks", "Live dashboards & weekly forecast", "Roles, permissions & full audit trail"],
  },
  {
    n: "02", tag: "Build", t: "Custom Apps",
    d: "Off-the-shelf software stops where your workflow gets interesting. We build the web and mobile apps that replace the messy middle, internal tools, client portals, and operational dashboards designed around the way you actually work.",
    outcome: "Outcome: hours back every week, fewer manual handoffs, and a product your team (or your customers) actually wants to open.",
    items: ["Web apps in React / Next.js", "iOS & Android (React Native)", "Internal tools & admin panels", "Client portals with self-serve flows", "Real-time operational dashboards", "Auth, billing, file storage built in"],
  },
  {
    n: "03", tag: "Ship", t: "Product Development",
    d: "From rough idea to production-ready product. We handle discovery, design, engineering and launch, partnering with founders and operators to ship software users actually love.",
    outcome: "Outcome: a real, working product in market, built to scale, easy to maintain, and shaped around your customers.",
    items: ["Product discovery & scoping", "UX / UI design and prototyping", "Full-stack engineering", "MVP build & rapid iteration", "QA, deployment & monitoring", "Post-launch support & roadmap"],
  },
  {
    n: "04", tag: "Extend", t: "Plugins & Integrations",
    d: "Bespoke extensions and integrations that connect your CRM, app and stack so data flows where it should, automatically.",
    outcome: "Outcome: less copy-paste, fewer errors, and tools that finally talk to each other.",
    items: ["WordPress & Shopify plugins", "Chrome extensions", "CRM & ERP integrations", "Webhooks & event streams", "API design & implementation", "Automations across your stack"],
  },
];

const integrations = ["Stripe", "HubSpot", "Slack", "Gmail", "Twilio", "Notion", "Zapier", "Airtable", "QuickBooks", "Shopify", "Calendly", "Postgres"];

export default function Platform() {
  return (
    <>
      <Section
        eyebrow="Our services"
        title={<>Four services. <span className="accent-gradient">One team.</span></>}
        description="Custom CRM, custom apps, product development, and custom plugins & integrations. Pick one, pick all four, every engagement is shaped to your business."
      />

      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-2xl border border-border-strong">
            <Image src="/crm-dashboard.jpg" alt="Go-Orca.Tech services overview" width={1920} height={1080} loading="lazy" className="w-full" />
          </div>
        </div>
      </section>

      <Section
        eyebrow="What we build"
        title={<>Pick what you need. <br />Skip what you don&apos;t.</>}
        description="Each service stands on its own, and works better when combined. Most clients start with one and grow from there."
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {serviceCategories.map((s) => (
            <article key={s.n} className="group bg-background p-8 transition-colors hover:bg-surface md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">{s.tag}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 max-w-md text-muted-foreground">{s.d}</p>
              {s.outcome && (
                <p className="mt-4 max-w-md border-l-2 border-primary/60 pl-3 text-sm font-medium text-foreground/90">{s.outcome}</p>
              )}
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What&apos;s included</div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 font-mono text-xs text-foreground/70">
                    <span className="h-px w-3 bg-primary" /> {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Integrations" title="Connects to your stack, without the duct tape.">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4 md:grid-cols-6">
          {integrations.map((n) => (
            <div key={n} className="flex aspect-[5/2] items-center justify-center bg-background py-4 font-mono text-sm text-foreground/70 transition-colors hover:bg-surface hover:text-foreground">
              {n}
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready when you are</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Tell us what you need built.</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Pick the services you&apos;re interested in, we&apos;ll come back with a custom quote within one business day.
          </p>
          <Link href="/contact" className="btn-base btn-primary mt-8 ring-glow">Get a quote →</Link>
        </div>
      </section>
    </>
  );
}
