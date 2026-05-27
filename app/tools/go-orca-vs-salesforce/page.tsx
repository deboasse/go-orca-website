import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/tools/ComparisonTable";

export const metadata: Metadata = {
  title: "Go-Orca vs Salesforce — Custom CRM vs Salesforce for SMBs",
  description: "Detailed comparison of Go-Orca (custom CRM) vs Salesforce. Cost, complexity, time-to-value, and which wins for small and mid-size businesses.",
  openGraph: { title: "Go-Orca vs Salesforce | Go-Orca.Tech", description: "Custom CRM vs Salesforce: cost, flexibility, and which is right for your team size." },
};

const rows = [
  { feature: "Starting cost (10 users)", goOrca: "$25,000–$50,000 one-time", competitor: "$1,500–$3,000/month", note: "Salesforce Sales Cloud Professional" },
  { feature: "Implementation complexity", goOrca: "Managed by Go-Orca team", competitor: "Months of configuration (often requires SI partner)" },
  { feature: "Time to first live use", goOrca: "4–8 weeks", competitor: "3–9 months" },
  { feature: "You own the code", goOrca: true, competitor: false },
  { feature: "You own the data", goOrca: true, competitor: false },
  { feature: "Admin required", goOrca: "Minimal (Go-Orca supports you)", competitor: "Dedicated Salesforce Admin often needed ($80–$120k/yr)" },
  { feature: "Customization", goOrca: "100% — any data model", competitor: "Extensive but complex (Apex, Lightning, clicks vs code)" },
  { feature: "Mobile app", goOrca: "Custom-built", competitor: "Salesforce generic mobile app" },
  { feature: "AI / Einstein", goOrca: "Custom AI for your workflow", competitor: "Salesforce Einstein (+$50/user/month)" },
  { feature: "3-year total cost", goOrca: "$30,000–$65,000", competitor: "$54,000–$180,000+", note: "Salesforce costs compound with add-ons and users" },
];

export default function GoOrcaVsSalesforce() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">Go-Orca vs Salesforce</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Comparison</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Go-Orca vs Salesforce</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">An honest comparison of building a custom CRM with Go-Orca vs deploying Salesforce. Particularly relevant for SMBs considering Salesforce for the first time.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-14">
        <ComparisonTable goOrcaLabel="Go-Orca (Custom CRM)" competitorLabel="Salesforce" rows={rows}
          verdict={{ goOrca: "Better for SMBs who want a CRM shaped to their exact process without a 6-month implementation and ongoing admin overhead.", competitor: "Better for enterprise teams (200+ users) who need the full Salesforce ecosystem, are already in the SF ecosystem, or have dedicated admin resources." }} />
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>The Salesforce implementation problem</h2>
          <p>Salesforce is one of the most powerful CRM platforms in the world. It&apos;s also one of the most complex to set up. Most SMBs underestimate the implementation effort: a typical Salesforce deployment for a 20-person team takes 3–9 months and often requires a Systems Integrator partner ($50,000–$150,000+) on top of the license fees.</p>
          <h2>Who Salesforce is right for</h2>
          <ul>
            <li>Enterprise teams (200+ users) with dedicated Salesforce admin resources</li>
            <li>Companies already deeply embedded in the Salesforce ecosystem (MuleSoft, Marketing Cloud, etc.)</li>
            <li>Teams that need the full enterprise compliance and audit trail capabilities</li>
          </ul>
          <h2>Who a custom CRM is right for</h2>
          <ul>
            <li>Teams of 5–200 where the Salesforce admin overhead isn&apos;t justified</li>
            <li>Businesses with unusual workflows that Salesforce&apos;s standard model doesn&apos;t accommodate well</li>
            <li>Operators who want to own their software long-term with no vendor dependency</li>
          </ul>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Not sure which fits your team?</p>
            <p className="mt-3 text-muted-foreground">Tell us how your business operates. We&apos;ll give you an honest recommendation — whether that&apos;s Go-Orca, Salesforce, or something else entirely.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a recommendation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
