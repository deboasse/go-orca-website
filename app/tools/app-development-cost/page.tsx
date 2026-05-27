import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom App Development Cost Guide 2025",
  description: "How much does it cost to build a custom web or mobile app in 2025? Explore cost ranges, key drivers, and what affects your timeline.",
  openGraph: { title: "Custom App Development Cost Guide 2025 | Go-Orca.Tech", description: "Real cost ranges for custom web and mobile app development in 2025, from MVP to full product." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Custom App Development Cost Guide 2025",
  url: "https://go-orca.tech/tools/app-development-cost",
  author: { "@type": "Organization", name: "Go-Orca.Tech" },
  description: "Detailed guide to custom web and mobile app development costs in 2025.",
};

const costRanges = [
  { type: "MVP / Prototype", range: "$8,000–$25,000", timeline: "2–5 weeks", desc: "Core feature set only. No polish, but functional and shippable." },
  { type: "Web App (internal tool)", range: "$15,000–$45,000", timeline: "4–10 weeks", desc: "Internal dashboard, admin panel, or client portal with auth and data management." },
  { type: "Customer-facing web app", range: "$25,000–$75,000", timeline: "6–14 weeks", desc: "Public-facing product with user accounts, billing, and full UX design." },
  { type: "Mobile app (iOS + Android)", range: "$35,000–$100,000", timeline: "8–20 weeks", desc: "React Native app for both platforms with custom UI, push notifications, and offline support." },
  { type: "Full product (web + mobile)", range: "$60,000–$180,000", timeline: "14–28 weeks", desc: "Complete product with web app, mobile app, admin panel, and integrations." },
];

export default function AppDevelopmentCost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">App Development Cost</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Cost guide</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Custom App Development Cost Guide 2025</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Real cost ranges for building custom web and mobile apps in 2025, from a focused MVP to a full product. Based on Go-Orca&apos;s actual project history.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-4">
          {costRanges.map((r) => (
            <div key={r.type} className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{r.type}</h2>
                  <p className="mt-1 text-muted-foreground">{r.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-primary">{r.range}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{r.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/contact" className="btn-base btn-primary ring-glow">Get a fixed-price quote for your project →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>What drives custom app development cost?</h2>
          <ul>
            <li><strong>Number of screens / features</strong> — each distinct feature area adds 1–3 weeks of development time.</li>
            <li><strong>Design complexity</strong> — a fully custom UI designed from scratch adds 20–40% to cost vs using a component library.</li>
            <li><strong>Integrations</strong> — each third-party API integration (payments, email, maps, ERP) adds $1,500–$5,000 depending on complexity.</li>
            <li><strong>Platform</strong> — web-only is cheapest; adding iOS + Android adds 30–50% to a web build; native apps cost 2–3× more than React Native.</li>
            <li><strong>Real-time features</strong> — live collaboration, chat, or WebSocket-heavy features add significant backend complexity.</li>
            <li><strong>Compliance</strong> — HIPAA, SOC 2, GDPR-compliant architectures add 20–40% to infrastructure and development cost.</li>
          </ul>
          <h2>Why do agency quotes vary so much?</h2>
          <p>A $10,000 quote and a $80,000 quote for &ldquo;the same app&rdquo; usually means they&apos;re scoping completely different things. The cheap quote typically excludes: UX/UI design, QA, deployment, documentation, and post-launch support. The expensive one often includes offshore team management overhead. Our quotes include everything needed to ship and maintain a production-ready app.</p>
          <h2>How does Go-Orca price projects?</h2>
          <p>We give you a fixed price after a 20-minute discovery call. That price covers design, engineering, QA, deployment, and 30 days of post-launch support. No surprises, no hourly billing, no scope creep games.</p>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready for a real number?</p>
            <p className="mt-3 text-muted-foreground">Tell us what you want to build. We&apos;ll come back within one business day with a fixed-price quote and a clear timeline.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
