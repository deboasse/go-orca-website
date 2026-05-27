import type { Metadata } from "next";
import Link from "next/link";
import { CrmRoiCalc } from "./CrmRoiCalc";

export const metadata: Metadata = {
  title: "CRM ROI Calculator — Is a Custom CRM Worth It?",
  description:
    "Calculate the ROI of a custom CRM in 60 seconds. Enter your team size, tool costs, and hours lost per week to see your annual savings, payback period, and 3-year return.",
  openGraph: {
    title: "Free CRM ROI Calculator | Go-Orca.Tech",
    description: "See exactly how much you'd save with a custom CRM vs spreadsheets or off-the-shelf tools.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CRM ROI Calculator",
  url: "https://go-orca.tech/tools/crm-roi-calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate your ROI from switching to a custom CRM. Free, instant, no sign-up required.",
  provider: { "@type": "Organization", name: "Go-Orca.Tech", url: "https://go-orca.tech" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://go-orca.tech" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://go-orca.tech/tools" },
    { "@type": "ListItem", position: 3, name: "CRM ROI Calculator", item: "https://go-orca.tech/tools/crm-roi-calculator" },
  ],
};

export default function CrmRoiCalculator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            <span>/</span>
            <span className="text-foreground">CRM ROI Calculator</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Free calculator</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            CRM ROI Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Is a custom CRM worth the investment? Enter your team size, current tool costs, and hours lost per week to see your exact annual savings, payback period, and 3-year return — in under 60 seconds.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">No sign-up · Instant results · 100% free</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <CrmRoiCalc />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>How to calculate CRM ROI</h2>
          <p>CRM ROI is calculated by comparing the total annual costs of your current approach (time lost to manual work + SaaS subscriptions) against the cost of a new system. A custom CRM typically recovers 60–80% of time lost to inefficient tools and reduces SaaS spend by 30–50%.</p>
          <p><strong>Formula:</strong> ROI = (Annual Savings − Investment Cost) ÷ Investment Cost × 100</p>

          <h2>What counts as &ldquo;hours lost&rdquo;?</h2>
          <p>Every hour your team spends copying data between tools, searching for customer information, manually updating spreadsheets, or re-entering the same data in two places is a recoverable cost. For most 10-person teams running on spreadsheets, this is 3–8 hours per week per person.</p>

          <h2>How much does a custom CRM cost?</h2>
          <p>A focused custom CRM for a team of 5–20 people typically costs $15,000–$50,000 to build. Use our <Link href="/tools/crm-cost-estimator" className="text-foreground underline">CRM Cost Estimator</Link> for a more precise range.</p>

          <h2>When does a custom CRM pay back faster than HubSpot or Salesforce?</h2>
          <ul>
            <li>Your team size is 5–200 people (sweet spot for custom builds)</li>
            <li>You&apos;re paying $500+/month for off-the-shelf tools you&apos;re only half-using</li>
            <li>Your workflow doesn&apos;t fit the standard CRM mold</li>
            <li>You&apos;re losing deals or customers due to data falling through the cracks</li>
          </ul>

          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready for a real number?</p>
            <p className="mt-3 text-muted-foreground">The calculator gives you a directional estimate. For a precise, fixed-price quote shaped to your actual team, workflow, and integrations — talk to us.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a custom quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
