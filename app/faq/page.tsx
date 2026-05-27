import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about pricing, timelines, ownership, and how we build custom CRMs and apps at Go-Orca.Tech",
};

const faqs = [
  { q: "How much does a custom CRM or app cost?", a: "Every project is different, pricing depends on your business type, team size, and exactly what you need built. After a short discovery call we send a clear, fixed price and timeline tailored to your scope. No hourly surprises." },
  { q: "How long does it take?", a: "A focused MVP usually ships in 2–5 weeks. Larger platforms take 6–12 weeks, with weekly demos so you see progress the whole way." },
  { q: "Do I own the code and data?", a: "Yes, fully. The code lives in your repo, the database is yours, and you can take it anywhere. No lock-in, no licensing games." },
  { q: "What stack do you build on?", a: "Modern, boring, reliable: React, TypeScript, Postgres, and edge-deployed APIs. Built to be easy for any future developer to maintain." },
  { q: "Can you integrate with the tools we already use?", a: "Almost always, Stripe, HubSpot, Google Workspace, Slack, QuickBooks, Twilio, and most modern APIs. If it has an API, we can connect it." },
  { q: "What happens after launch?", a: "We offer ongoing support and iteration plans, or we hand off cleanly with documentation. Many clients keep us on as their long-term product team." },
  { q: "Do you sign NDAs?", a: "Yes. Send yours over or use ours, we sign before discovery if you'd like." },
];

// JSON-LD FAQ schema for Google rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">FAQ</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Questions, answered.</h1>
      <p className="mt-4 text-lg text-muted-foreground">The things people usually want to know before working with us.</p>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
              <span className="text-base font-medium text-foreground">{item.q}</span>
              <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-border bg-surface/40 p-8">
        <h2 className="text-xl font-semibold text-foreground">Still have questions?</h2>
        <p className="mt-2 text-muted-foreground">
          Email us at{" "}
          <a href="mailto:hello@go-orca.tech" className="text-foreground underline">hello@go-orca.tech</a>{" "}
          or start a conversation.
        </p>
        <Link href="/contact" className="btn-base btn-primary mt-6">Contact us →</Link>
      </div>
    </main>
  );
}
