"use client";

import { CalculatorShell } from "@/components/tools/CalculatorShell";

const fields = [
  { key: "teamSize", label: "Team size", suffix: " people", defaultValue: 8, min: 1, max: 100, step: 1, description: "Number of people who will use the CRM" },
  { key: "hoursLost", label: "Hours lost per person / week", suffix: " hrs", defaultValue: 5, min: 1, max: 20, step: 0.5, description: "Time spent on manual data entry, searching files, etc." },
  { key: "hourlyRate", label: "Average hourly cost per employee", prefix: "$", defaultValue: 45, min: 15, max: 200, step: 5, description: "Loaded cost (salary + benefits)" },
  { key: "toolCosts", label: "Monthly SaaS / tool spend", prefix: "$", defaultValue: 800, min: 0, max: 10000, step: 100, description: "Current spend on CRMs, spreadsheets, tools" },
  { key: "crmInvestment", label: "Custom CRM build investment", prefix: "$", defaultValue: 25000, min: 5000, max: 150000, step: 1000, description: "One-time cost to build a custom CRM" },
];

function compute(v: Record<string, number>) {
  const annualCostHours = v.teamSize * v.hoursLost * 52 * v.hourlyRate;
  const annualToolCosts = v.toolCosts * 12;
  const annualSavings = annualCostHours * 0.7 + annualToolCosts * 0.4;
  const paybackMonths = v.crmInvestment / (annualSavings / 12);
  const threeYearROI = ((annualSavings * 3 - v.crmInvestment) / v.crmInvestment) * 100;
  return [
    { label: "Annual savings", value: `$${Math.round(annualSavings).toLocaleString()}`, highlight: true },
    { label: "Payback period", value: paybackMonths < 1 ? "< 1 month" : `${Math.round(paybackMonths)} months` },
    { label: "3-year ROI", value: `${Math.round(threeYearROI)}%` },
    { label: "Current annual cost (tools + lost time)", value: `$${Math.round(annualCostHours + annualToolCosts).toLocaleString()}` },
  ];
}

export function CrmRoiCalc() {
  return (
    <CalculatorShell
      title="Calculate your CRM ROI"
      description="Adjust the sliders to match your business. Results update instantly."
      fields={fields}
      compute={compute}
    />
  );
}
