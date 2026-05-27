import type { Metadata } from "next";
import Link from "next/link";
import { CacCalc } from "./CacCalc";

export const metadata: Metadata = {
  title: "Customer Acquisition Cost (CAC) Calculator",
  description: "Calculate your true Customer Acquisition Cost (CAC) from total marketing and sales spend. Free, instant, no login required.",
  openGraph: { title: "Free CAC Calculator | Go-Orca.Tech", description: "Calculate your Customer Acquisition Cost instantly." },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Customer Acquisition Cost Calculator",
  url: "https://go-orca.tech/tools/cac-calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate CAC from marketing spend, sales costs, and new customers acquired. Free and instant.",
  provider: { "@type": "Organization", name: "Go-Orca.Tech", url: "https://go-orca.tech" },
};

export default function CacCalculator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">CAC Calculator</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">Free calculator</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Customer Acquisition Cost (CAC) Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Enter your total marketing and sales spend and the number of new customers acquired each month to instantly calculate your CAC, LTV:CAC ratio, and payback period.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">No sign-up · Instant results · 100% free</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <CacCalc />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>What is Customer Acquisition Cost (CAC)?</h2>
          <p>CAC is the total cost of sales and marketing divided by the number of new customers acquired. <strong>Formula:</strong> CAC = (Marketing Spend + Sales Costs) ÷ New Customers</p>
          <h2>What is a good CAC?</h2>
          <p>A LTV:CAC ratio of 3:1 or higher is generally considered healthy for B2B businesses. Below 2:1 means you&apos;re spending too much to acquire customers relative to what they&apos;re worth.</p>
          <h2>How can a CRM lower your CAC?</h2>
          <ul>
            <li><strong>Faster follow-up</strong> — automated reminders mean no lead waits more than a few hours for a response.</li>
            <li><strong>Better pipeline visibility</strong> — you close more deals by knowing exactly where every prospect stands.</li>
            <li><strong>Attribution data</strong> — custom reports show which channels actually produce customers.</li>
          </ul>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Want to reduce your CAC?</p>
            <p className="mt-3 text-muted-foreground">A custom CRM built around your sales process can cut CAC by 20–40% through faster follow-up and better attribution. Let&apos;s talk.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a custom quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
