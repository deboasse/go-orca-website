import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Marketing & CRM Tools — Calculators, Comparisons & Cost Guides",
  description:
    "Free interactive tools for business operators: CRM ROI calculator, customer acquisition cost calculator, custom CRM cost estimator, comparison guides, and more.",
  openGraph: {
    title: "Free CRM & Marketing Tools | Go-Orca.Tech",
    description: "Interactive calculators, comparison tools, and cost guides to help you make smarter decisions about your business software.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Go-Orca Free Business Tools",
  description: "Free interactive calculators, comparison tools, and cost guides for business operators.",
  url: "https://go-orca.tech/tools",
  hasPart: [
    { "@type": "SoftwareApplication", name: "CRM ROI Calculator", url: "https://go-orca.tech/tools/crm-roi-calculator", applicationCategory: "BusinessApplication" },
    { "@type": "SoftwareApplication", name: "Customer Acquisition Cost Calculator", url: "https://go-orca.tech/tools/cac-calculator", applicationCategory: "BusinessApplication" },
    { "@type": "SoftwareApplication", name: "Custom CRM Cost Estimator", url: "https://go-orca.tech/tools/crm-cost-estimator", applicationCategory: "BusinessApplication" },
    { "@type": "SoftwareApplication", name: "App Development Cost Guide", url: "https://go-orca.tech/tools/app-development-cost", applicationCategory: "BusinessApplication" },
  ],
};

const tools = [
  {
    href: "/tools/crm-roi-calculator",
    tag: "Calculator",
    title: "CRM ROI Calculator",
    desc: "Enter your team size and current tool costs. Get an instant ROI estimate and payback period for a custom CRM.",
    badge: "Most popular",
  },
  {
    href: "/tools/cac-calculator",
    tag: "Calculator",
    title: "Customer Acquisition Cost (CAC) Calculator",
    desc: "Calculate your true CAC from marketing spend, sales costs, and new customers acquired in any period.",
    badge: null,
  },
  {
    href: "/tools/crm-cost-estimator",
    tag: "Cost guide",
    title: "Custom CRM Cost Estimator",
    desc: "Answer 5 questions about your business. Get a realistic build cost range and timeline for a custom CRM.",
    badge: null,
  },
  {
    href: "/tools/app-development-cost",
    tag: "Cost guide",
    title: "Custom App Development Cost Guide",
    desc: "How much does it cost to build a custom app in 2025? Explore cost drivers, ranges, and what to expect.",
    badge: null,
  },
  {
    href: "/tools/go-orca-vs-hubspot",
    tag: "Comparison",
    title: "Go-Orca vs HubSpot",
    desc: "Side-by-side comparison of a custom-built CRM vs HubSpot. Which is right for your team?",
    badge: null,
  },
  {
    href: "/tools/go-orca-vs-salesforce",
    tag: "Comparison",
    title: "Go-Orca vs Salesforce",
    desc: "Custom CRM vs Salesforce: cost, flexibility, time-to-value, and which wins for SMBs.",
    badge: null,
  },
  {
    href: "/tools/custom-vs-off-the-shelf",
    tag: "A vs B",
    title: "Custom CRM vs Off-the-Shelf",
    desc: "Should you build or buy your CRM? A structured guide to help you decide based on your specific situation.",
    badge: null,
  },
  {
    href: "/tools/spreadsheet-vs-crm",
    tag: "A vs B",
    title: "Spreadsheet vs CRM",
    desc: "Still running your business on spreadsheets? Find out when it's time to upgrade and what you're actually losing.",
    badge: null,
  },
];

export default function ToolsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg radial-fade opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />Free tools · No sign-up required
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Free tools for{" "}
              <span className="accent-gradient">smarter decisions.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Calculators, comparison guides, and cost estimators to help you choose the right CRM, measure marketing ROI, and understand what software actually costs.
            </p>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-surface/40 p-7 transition-all hover:border-border-strong hover:bg-surface hover:shadow-glow"
            >
              {t.badge && (
                <span className="absolute right-5 top-5 rounded-full bg-primary/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {t.badge}
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{t.tag}</span>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {t.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready to build?</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Done calculating? Let&apos;s get you a real quote.</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Tell us about your business in 4 short steps. We&apos;ll come back with a fixed-price quote tailored to your exact situation.</p>
          <Link href="/contact" className="btn-base btn-primary mt-8 ring-glow">Get a custom quote →</Link>
        </div>
      </section>
    </>
  );
}
