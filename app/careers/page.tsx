import type { Metadata } from "next";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Careers — Join Go-Orca.Tech",
  description: "Join Go-Orca. Send us your resume and tell us how you'd like to contribute to building custom CRM, internal tools and operational software.",
};

export default function Careers() {
  return (
    <Section
      eyebrow="Careers"
      title={<>Build with <span className="accent-gradient">Go-Orca.</span></>}
      description="We ship custom CRMs, internal tools and operational software. If that sounds like your kind of work, send us your resume."
    >
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-surface/40 p-10">
            <h3 className="text-2xl font-semibold">No open positions right now.</h3>
            <p className="mt-3 text-muted-foreground">
              We&apos;re a small, focused team. We hire rarely but thoughtfully. If you&apos;re a strong engineer, designer, or operator who builds things that matter, send us your work anyway.
            </p>
            <a
              href="mailto:hello@go-orca.tech?subject=Speculative application"
              className="btn-base btn-primary mt-6"
            >
              Send your resume →
            </a>
          </div>
        </div>
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface/40 p-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">How we hire</h4>
            <p className="mt-4 text-sm text-foreground/85">We read every application personally. No ATS keyword games. If your background overlaps with what we&apos;re building, we&apos;ll reach out for a short intro call.</p>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-surface/40 p-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Prefer email?</h4>
            <p className="mt-4 text-sm">
              <a href="mailto:hello@go-orca.tech" className="text-foreground hover:text-primary">hello@go-orca.tech</a>
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
