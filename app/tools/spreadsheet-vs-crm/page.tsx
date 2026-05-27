import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/tools/ComparisonTable";

export const metadata: Metadata = {
  title: "Spreadsheet vs CRM — When Is It Time to Upgrade?",
  description: "Still managing customers in spreadsheets? Find out exactly what you're losing and when it's time to move to a CRM.",
};

const rows = [
  { feature: "Real-time visibility for team", goOrca: true, competitor: false, note: "Spreadsheets require manual updates and sharing" },
  { feature: "Duplicate data prevention", goOrca: true, competitor: false },
  { feature: "Automated follow-ups & reminders", goOrca: true, competitor: false },
  { feature: "Audit trail / history", goOrca: true, competitor: "Manual notes only" },
  { feature: "Scales past 500 rows", goOrca: true, competitor: "Becomes unusable" },
  { feature: "Shared inbox integration", goOrca: true, competitor: false },
  { feature: "Mobile access", goOrca: true, competitor: "Basic (read-only if lucky)" },
  { feature: "Reporting & forecasting", goOrca: "Real-time dashboards", competitor: "Manual pivot tables" },
  { feature: "Cost (5-person team)", goOrca: "$15,000–$35,000 build", competitor: "$0 (but costs you in time)" },
  { feature: "Setup time", goOrca: "4–6 weeks", competitor: "Immediate" },
];

export default function SpreadsheetVsCrm() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/tools" className="hover:text-foreground">Tools</Link><span>/</span>
            <span className="text-foreground">Spreadsheet vs CRM</span>
          </nav>
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">A vs B Guide</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Spreadsheet vs CRM</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Spreadsheets are free, familiar, and flexible — until they aren&apos;t. Here&apos;s an honest breakdown of what you&apos;re trading away, and the signals that it&apos;s time to move on.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-14">
        <ComparisonTable goOrcaLabel="Custom CRM" competitorLabel="Spreadsheets" rows={rows}
          verdict={{ goOrca: "Right when your team has more than 3 people, more than 200 active customers/leads, or when losing a deal because of a missed follow-up has happened more than once.", competitor: "Right when you&apos;re a solo operator, just starting out, or tracking fewer than 50 customers with no team sharing the data." }} />
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="tool-prose">
          <h2>The 5 signs you&apos;ve outgrown spreadsheets</h2>
          <ul>
            <li><strong>Deals are falling through the cracks.</strong> A lead expressed interest three weeks ago and nobody followed up because the row got buried.</li>
            <li><strong>You can&apos;t tell where your pipeline stands.</strong> Generating a weekly sales report takes 2+ hours of manual work.</li>
            <li><strong>Multiple people edit the same file.</strong> Merge conflicts, overwritten data, version chaos.</li>
            <li><strong>You can&apos;t onboard new team members smoothly.</strong> There&apos;s no clear process, just institutional knowledge in somebody&apos;s head.</li>
            <li><strong>Customer history lives in email threads.</strong> When someone leaves, that knowledge leaves with them.</li>
          </ul>
          <h2>The real cost of spreadsheets</h2>
          <p>Spreadsheets feel free, but they cost you in time. A 5-person team spending 5 hours each per week on manual data management is burning $70,000–$120,000 in annual labor on work a CRM automates. Use our <Link href="/tools/crm-roi-calculator" className="text-foreground underline">CRM ROI Calculator</Link> to see your exact number.</p>
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready to see what your CRM would look like?</p>
            <p className="mt-3 text-muted-foreground">Tell us how you operate today. We&apos;ll show you the dashboard we&apos;d build for you — shaped around how you actually work, not a generic template.</p>
            <Link href="/contact" className="btn-base btn-primary mt-5 ring-glow">Get a custom quote →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
