"use client";

import { CalculatorShell } from "@/components/tools/CalculatorShell";

const fields = [
  { key: "marketingSpend", label: "Monthly marketing spend", prefix: "$", defaultValue: 5000, min: 0, max: 100000, step: 500, description: "Ads, content, SEO, events" },
  { key: "salesCosts", label: "Monthly sales team cost", prefix: "$", defaultValue: 8000, min: 0, max: 200000, step: 500, description: "Salaries, commissions, tools" },
  { key: "newCustomers", label: "New customers per month", suffix: " customers", defaultValue: 12, min: 1, max: 1000, step: 1 },
  { key: "avgDealSize", label: "Average deal value", prefix: "$", defaultValue: 3500, min: 100, max: 100000, step: 100 },
];

function compute(v: Record<string, number>) {
  const totalSpend = v.marketingSpend + v.salesCosts;
  const cac = totalSpend / v.newCustomers;
  const ltv = v.avgDealSize * 2.5;
  const ratio = ltv / cac;
  const paybackMonths = cac / (v.avgDealSize / 12);
  return [
    { label: "Customer Acquisition Cost (CAC)", value: `$${Math.round(cac).toLocaleString()}`, highlight: true },
    { label: "LTV:CAC ratio (estimated)", value: `${ratio.toFixed(1)}:1` },
    { label: "Payback period", value: `${Math.round(paybackMonths)} months` },
    { label: "Total monthly acquisition spend", value: `$${totalSpend.toLocaleString()}` },
  ];
}

export function CacCalc() {
  return (
    <CalculatorShell
      title="Calculate your CAC"
      description="Adjust the sliders. Results update instantly."
      fields={fields}
      compute={compute}
    />
  );
}
