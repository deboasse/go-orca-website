"use client";

import { useState } from "react";
import Link from "next/link";

export interface CalcField {
  key: string;
  label: string;
  prefix?: string;
  suffix?: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  description?: string;
}

export interface CalcResult {
  label: string;
  value: string;
  highlight?: boolean;
}

// Each calculator page wraps this with its own inline compute function.
// Usage: import this in a "use client" page or client sub-component.
export function CalculatorShell({
  title,
  description,
  fields,
  compute,
}: {
  title: string;
  description: string;
  fields: CalcField[];
  compute: (values: Record<string, number>) => CalcResult[];
}) {
  const defaults = Object.fromEntries(fields.map((f) => [f.key, f.defaultValue]));
  const [values, setValues] = useState<Record<string, number>>(defaults);

  const results = compute(values);

  const set = (key: string, raw: string) => {
    const n = parseFloat(raw);
    if (!isNaN(n)) setValues((v) => ({ ...v, [key]: n }));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{f.label}</label>
                <span className="font-mono text-sm text-primary font-semibold">
                  {f.prefix}{values[f.key].toLocaleString()}{f.suffix}
                </span>
              </div>
              {f.description && <p className="mb-2 text-xs text-muted-foreground">{f.description}</p>}
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full accent-primary h-2 cursor-pointer rounded-full bg-border"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>{f.prefix}{f.min.toLocaleString()}{f.suffix}</span>
                <span>{f.prefix}{f.max.toLocaleString()}{f.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {results.map((r) => (
            <div
              key={r.label}
              className={`rounded-xl border p-5 ${r.highlight ? "border-primary/40 bg-primary/10 ring-1 ring-primary/20" : "border-border bg-background"}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</p>
              <p className={`mt-1 text-3xl font-semibold tracking-tight ${r.highlight ? "text-primary" : "text-foreground"}`}>
                {r.value}
              </p>
            </div>
          ))}
          <Link href="/contact" className="btn-base btn-primary mt-2 ring-glow">
            Get a custom quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
