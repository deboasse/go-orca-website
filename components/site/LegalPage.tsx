import type { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Last updated: {updated}
      </p>
      <div className="legal-prose mt-12 space-y-8 text-muted-foreground">{children}</div>
      <p className="mt-16 rounded-lg border border-border bg-surface/40 p-4 text-xs text-muted-foreground">
        This document is provided as a starting template and does not constitute legal advice. Please have a qualified
        attorney review before relying on it for your business.
      </p>
    </main>
  );
}

export function Sec({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
