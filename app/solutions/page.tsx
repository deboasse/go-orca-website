import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Solutions — A Custom CRM for Any Business",
  description:
    "We build custom CRM dashboards for any type of business, services, logistics, real estate, health and more. One place for everything.",
};

const cases = [
  { sector: "Professional services", title: "From quote to invoice in one pane.", body: "Proposals, project tracking, time and billing, all in a CRM your account managers don't hate.", stat: "31% faster cash collection" },
  { sector: "Logistics & ops", title: "Dispatch, track, settle. Repeat.", body: "Custom dispatch board, driver app and customer portal that replaced 3 SaaS subscriptions.", stat: "12 hours saved / week" },
  { sector: "Real estate", title: "Listings, leads and showings, synced.", body: "MLS-aware CRM, automated lead nurturing and a branded buyer portal.", stat: "+38% qualified leads" },
  { sector: "Health & wellness", title: "Patients, bookings and revenue, in one place.", body: "HIPAA-aware booking, EHR integrations and member portal, all under your brand.", stat: "2.4× rebooking rate" },
];

export default function Solutions() {
  return (
    <>
      <Section
        eyebrow="Solutions"
        title={<>A custom CRM for <span className="accent-gradient">any business</span>, organized your way.</>}
        description="We've shipped CRM dashboards across services, logistics, real estate and health. Same idea every time: your operation in one place, nothing lost."
      />

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <article key={c.sector} className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-8 transition-colors hover:border-border-strong hover:bg-surface md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{c.sector}</span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/70">Case</span>
              </div>
              <h3 className="mt-6 text-balance text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
              <p className="mt-3 text-muted-foreground">{c.body}</p>
              <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
                <span className="text-2xl font-semibold text-primary">{c.stat}</span>
                <Link href="/contact" className="font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground">
                  Discuss yours →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Don&apos;t see your business?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            That&apos;s the whole point. Tell us how you operate, and we&apos;ll show you the dashboard we&apos;d build for you.
          </p>
          <Link href="/contact" className="btn-base btn-primary mt-8 ring-glow">Start the conversation →</Link>
        </div>
      </section>
    </>
  );
}
