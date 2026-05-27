import Link from "next/link";

interface Row {
  feature: string;
  goOrca: string | boolean;
  competitor: string | boolean;
  note?: string;
}

function Cell({ val }: { val: string | boolean }) {
  if (typeof val === "boolean") {
    return (
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs ${val ? "bg-primary/20 text-primary" : "bg-destructive/10 text-destructive"}`}>
        {val ? "✓" : "✗"}
      </span>
    );
  }
  return <span className="text-sm text-foreground">{val}</span>;
}

export function ComparisonTable({
  goOrcaLabel,
  competitorLabel,
  rows,
  verdict,
}: {
  goOrcaLabel: string;
  competitorLabel: string;
  rows: Row[];
  verdict: { goOrca: string; competitor: string };
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="grid grid-cols-3 gap-px bg-border">
        <div className="bg-surface px-6 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Feature</div>
        <div className="bg-primary/10 px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-primary">{goOrcaLabel}</div>
        <div className="bg-surface px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">{competitorLabel}</div>
      </div>
      {rows.map((row, i) => (
        <div key={row.feature} className={`grid grid-cols-3 gap-px bg-border ${i % 2 === 0 ? "" : ""}`}>
          <div className="bg-background px-6 py-4">
            <p className="text-sm font-medium text-foreground">{row.feature}</p>
            {row.note && <p className="mt-1 text-xs text-muted-foreground">{row.note}</p>}
          </div>
          <div className="flex items-center justify-center bg-primary/5 px-6 py-4"><Cell val={row.goOrca} /></div>
          <div className="flex items-center justify-center bg-background px-6 py-4"><Cell val={row.competitor} /></div>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-px bg-border">
        <div className="bg-surface px-6 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Verdict</div>
        <div className="bg-primary/10 px-6 py-5 text-sm font-medium text-primary">{verdict.goOrca}</div>
        <div className="bg-surface px-6 py-5 text-sm text-muted-foreground">{verdict.competitor}</div>
      </div>
      <div className="bg-background px-6 py-5 text-center">
        <Link href="/contact" className="btn-base btn-primary btn-sm ring-glow">Get a custom quote →</Link>
      </div>
    </div>
  );
}
