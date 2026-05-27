import type { Metadata } from "next";
import Link from "next/link";
import { CrmCostCalc } from "./CrmCostCalc";

export const metadata: Metadata = {
  title: "Custom CRM Cost Estimator — How Much Does a Custom CRM Cost?",
  description: "Get a realistic cost estimate for building a custom CRM. Answer 5 questions and get an instant range. Free, no sign-up.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Custom CRM Cost Estimator",
  url: "https://go-orca.tech/tools/crm-cost-estimator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Estimate the cost to build a custom CRM. Free and instant.",
  provider: { "@type": "Organization", name: "Go-Orca.Tech", url: "https://go-orca.tech" },
};

export default function CrmCostEstimator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">CRM Cost Estimator</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Cost guide</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Custom CRM Cost Estimator</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Adjust the sliders to match your team size, number of modules, and integrations. Get an instant cost range for building a custom CRM.</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14">
        <CrmCostCalc />
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>How much does a custom CRM cost in 2025?</h2>
          <p>A custom CRM typically costs between <strong>$15,000 and $80,000</strong> to build, depending on team size, number of modules, integrations required, and timeline. Most projects for 5–30 person teams land in the $20,000–$45,000 range.</p>
          <h2>What drives CRM build cost?</h2>
          <ul>
            <li><strong>Number of modules</strong> — each functional area adds to scope.</li>
            <li><strong>Integrations</strong> — connecting to Stripe, QuickBooks, Gmail, Slack adds complexity.</li>
            <li><strong>Team size</strong> — more users means more complex permissions logic.</li>
            <li><strong>Timeline pressure</strong> — rush builds cost 20–30% more.</li>
          </ul>
          <h2>Is a custom CRM cheaper than HubSpot long-term?</h2>
          <p>For most teams over 10 people, yes. HubSpot Professional for 10 users costs $800–$1,500/month. Over 3 years: $29,000–$54,000 with no code ownership. A custom CRM at $30,000 pays for itself in year 2.</p>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Get a fixed-price quote</p>
            <p className="mt-3 text-muted-foreground">After a 20-minute call, we&apos;ll give you an exact, fixed-price proposal with a clear scope and timeline.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
