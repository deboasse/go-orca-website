import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/tools/ComparisonTable";

export const metadata: Metadata = {
  title: "Go-Orca vs HubSpot — Custom CRM vs HubSpot Comparison",
  description:
    "Honest side-by-side comparison of Go-Orca (custom CRM) vs HubSpot. Cost, flexibility, setup time, and which is right for your business.",
  openGraph: { title: "Go-Orca vs HubSpot | Custom CRM vs HubSpot", description: "Custom CRM vs HubSpot: detailed comparison of cost, customization, setup time, and long-term value." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Go-Orca vs HubSpot: Custom CRM vs Off-the-Shelf",
  url: "https://go-orca.tech/tools/go-orca-vs-hubspot",
  author: { "@type": "Organization", name: "Go-Orca.Tech" },
  description: "Detailed comparison of building a custom CRM with Go-Orca vs using HubSpot.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://go-orca.tech" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://go-orca.tech/tools" },
    { "@type": "ListItem", position: 3, name: "Go-Orca vs HubSpot", item: "https://go-orca.tech/tools/go-orca-vs-hubspot" },
  ],
};

const rows = [
  { feature: "Monthly cost (10 users)", goOrca: "$0 recurring (one-time build)", competitor: "$800–$4,000/month", note: "HubSpot Professional/Enterprise" },
  { feature: "Customization", goOrca: "100% — built around your workflow", competitor: "Limited to HubSpot's data model" },
  { feature: "Time to deploy", goOrca: "4–8 weeks", competitor: "1–3 days (but months to configure properly)" },
  { feature: "You own the code", goOrca: true, competitor: false },
  { feature: "You own the data", goOrca: true, competitor: false, note: "Data export available but you depend on their infrastructure" },
  { feature: "Custom fields & pipelines", goOrca: "Unlimited, any shape", competitor: "Limited by plan, complex workarounds needed" },
  { feature: "Custom reporting", goOrca: true, competitor: "Basic — advanced requires Operations Hub ($720+/mo)" },
  { feature: "Mobile app", goOrca: "Custom-built to match your workflow", competitor: "Generic HubSpot mobile app" },
  { feature: "Third-party integrations", goOrca: "Any API we can connect", competitor: "HubSpot App Marketplace (limited control)" },
  { feature: "AI / automation", goOrca: "Custom-built for your exact process", competitor: "HubSpot AI (generic, template-based)" },
  { feature: "Support", goOrca: "Direct access to your build team", competitor: "Support tickets, knowledge base" },
  { feature: "3-year total cost (10 users)", goOrca: "$25,000–$60,000", competitor: "$29,000–$144,000+", note: "HubSpot costs compound with users and features" },
];

export default function GoOrcaVsHubSpot() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">Go-Orca vs HubSpot</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Comparison</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Go-Orca vs HubSpot
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            An honest comparison of building a custom CRM with Go-Orca vs subscribing to HubSpot. We cover cost, customization, setup time, and who each is actually right for.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <ComparisonTable
          goOrcaLabel="Go-Orca (Custom CRM)"
          competitorLabel="HubSpot"
          rows={rows}
          verdict={{
            goOrca: "Better for teams who need a CRM shaped to their exact workflow and want to own their software long-term.",
            competitor: "Better for teams who need to get started in days and are comfortable working within HubSpot's structure.",
          }}
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>When to choose HubSpot</h2>
          <ul>
            <li>You need to be live in days, not weeks</li>
            <li>Your sales process matches HubSpot&apos;s standard deal/contact model closely</li>
            <li>You have under 5 users and budget is the primary concern</li>
            <li>You&apos;re not sure what you need yet and want to experiment</li>
          </ul>

          <h2>When to choose a custom CRM</h2>
          <ul>
            <li>Your pipeline or data model doesn&apos;t fit HubSpot&apos;s template</li>
            <li>You&apos;re paying $500+/month for HubSpot but only using 30% of it</li>
            <li>You have 5–200 users and plan to be operational for 3+ years</li>
            <li>You need deep integrations with industry-specific tools</li>
            <li>You want to own your code and data with no vendor lock-in</li>
          </ul>

          <h2>The 3-year cost reality</h2>
          <p>HubSpot&apos;s costs compound aggressively. A 10-person team on Professional starts at ~$800/month ($9,600/year). Add the Operations Hub for proper reporting, and you&apos;re at $1,500+/month. Over 3 years: $54,000–$144,000+ with no code ownership at the end of it.</p>
          <p>A custom CRM built with Go-Orca costs $25,000–$60,000 once. You own the code, the data, and the infrastructure. Year 2 and Year 3 cost near zero.</p>

          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Not sure which is right for you?</p>
            <p className="mt-3 text-muted-foreground">Tell us about your business in 4 short steps. We&apos;ll give you an honest recommendation — even if the answer is HubSpot.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a recommendation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
