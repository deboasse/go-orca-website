import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/tools/ComparisonTable";

export const metadata: Metadata = {
  title: "Custom CRM vs Off-the-Shelf CRM — Which Is Right for Your Business?",
  description: "Should you build a custom CRM or buy an off-the-shelf solution? A structured decision guide covering cost, timeline, flexibility, and ownership.",
};

const rows = [
  { feature: "Fits your exact workflow", goOrca: true, competitor: "Rarely — you adapt to it" },
  { feature: "Upfront cost", goOrca: "$15,000–$60,000", competitor: "$0–$500/month (but compounds)" },
  { feature: "3-year total cost", goOrca: "One-time + minimal hosting", competitor: "$18,000–$150,000+" },
  { feature: "Time to live", goOrca: "4–10 weeks", competitor: "1–3 days (weeks to really configure)" },
  { feature: "Code ownership", goOrca: true, competitor: false },
  { feature: "Data ownership", goOrca: true, competitor: false },
  { feature: "Custom integrations", goOrca: "Any API, any depth", competitor: "Limited to marketplace connectors" },
  { feature: "Scales with your business", goOrca: "Add any module as you grow", competitor: "Upgrade plans (cost jumps)" },
  { feature: "Mobile app", goOrca: "Custom to your workflow", competitor: "Generic vendor app" },
  { feature: "Training required", goOrca: "Minimal (built for your team)", competitor: "Moderate (generic UX, lots of unused features)" },
];

export default function CustomVsOffTheShelf() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">Custom vs Off-the-Shelf CRM</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">A vs B Guide</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Custom CRM vs Off-the-Shelf</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Should you build or buy your CRM? A structured comparison to help you make the right decision based on your specific team size, workflow, and budget.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-14">
        <ComparisonTable goOrcaLabel="Custom CRM (Go-Orca)" competitorLabel="Off-the-Shelf (HubSpot, Salesforce, etc.)" rows={rows}
          verdict={{ goOrca: "Right when your workflow is unique, your team is 5–200 people, and you want software that you own.", competitor: "Right when you need to be live in days, your process fits the template, or you have fewer than 5 users." }} />
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>The build vs buy decision</h2>
          <p>The core question is: <strong>does your business need to adapt to the software, or does the software need to adapt to your business?</strong></p>
          <p>Off-the-shelf CRMs like HubSpot and Salesforce are built for the average business. If your operation is close to average, they work well. If your pipeline, data model, or workflow has anything unusual about it, you&apos;ll spend months fighting the software.</p>
          <h2>When to buy off-the-shelf</h2>
          <ul>
            <li>You need to be operational in days</li>
            <li>Your team is under 5 people and budget is tight</li>
            <li>Your sales process is standard (contacts → leads → deals → closed)</li>
            <li>You&apos;re still figuring out your process and need to experiment</li>
          </ul>
          <h2>When to build custom</h2>
          <ul>
            <li>You&apos;re paying for features you never use</li>
            <li>You&apos;ve outgrown what the off-the-shelf tool can do</li>
            <li>You&apos;re paying $500+/month and the cost keeps climbing</li>
            <li>Your team ignores the CRM because it doesn&apos;t match how they work</li>
            <li>You want to own your data and code with no vendor dependency</li>
          </ul>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Not sure which fits your situation?</p>
            <p className="mt-3 text-muted-foreground">Tell us how your business operates. We&apos;ll give you an honest build-or-buy recommendation with a fixed-price quote if custom is the right call.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a recommendation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
