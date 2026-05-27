import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { QuoteWizard } from "@/components/wizard/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Answer a few quick questions about your business and we'll build a custom CRM quote shaped to your size, goals and timeline.",
};

export default function Contact() {
  return (
    <Section
      eyebrow="Custom quote"
      title={<>Tell us about <span className="accent-gradient">your business.</span></>}
      description="Four short steps. No sales pitch. We'll review your answers and come back with a custom quote shaped to your business, usually within one business day."
    >
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <QuoteWizard />
        </div>
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface/40 p-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Why we ask</h4>
            <p className="mt-4 text-sm text-foreground/85">
              Every business is different. Generic packages produce generic software. The more we know about how you
              actually operate, the sharper, and more honest, our quote will be.
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-surface/40 p-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What happens next</h4>
            <ol className="mt-5 space-y-4 text-sm">
              {["You finish the wizard.", "A founder reviews your answers personally.", "We send a custom quote shaped to your business.", "If it fits, we book a 20-min plan call."].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <span className="text-foreground/85">{s}</span>
                </li>
              ))}
            </ol>
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
