"use client";

import { CalculatorShell } from "@/components/tools/CalculatorShell";

const fields = [
  { key: "teamSize", label: "Team size (users)", suffix: " people", defaultValue: 10, min: 1, max: 200, step: 1 },
  { key: "modules", label: "Number of modules needed", suffix: " modules", defaultValue: 4, min: 1, max: 12, step: 1, description: "e.g. pipeline, contacts, inbox, reports, tasks, portal" },
  { key: "integrations", label: "Number of integrations", suffix: " integrations", defaultValue: 2, min: 0, max: 15, step: 1, description: "e.g. Stripe, Slack, QuickBooks, Gmail" },
  { key: "timelineWeeks", label: "Desired timeline", suffix: " weeks", defaultValue: 8, min: 3, max: 24, step: 1 },
];

function compute(v: Record<string, number>) {
  const base = 8000;
  const modulesCost = v.modules * 2500;
  const integrationsCost = v.integrations * 1500;
  const teamMultiplier = v.teamSize > 50 ? 1.3 : v.teamSize > 20 ? 1.15 : 1;
  const timelineMultiplier = v.timelineWeeks < 5 ? 1.3 : v.timelineWeeks < 8 ? 1.1 : 1;
  const low = Math.round((base + modulesCost + integrationsCost) * teamMultiplier * timelineMultiplier * 0.85 / 1000) * 1000;
  const high = Math.round(low * 1.4 / 1000) * 1000;
  const monthly = Math.round((low + high) / 2 / v.timelineWeeks / 4 / 1000) * 1000;
  return [
    { label: "Estimated cost range", value: `$${low.toLocaleString()} – $${high.toLocaleString()}`, highlight: true },
    { label: "Avg. monthly investment", value: `$${monthly.toLocaleString()}/month` },
    { label: "Timeline", value: `${v.timelineWeeks} weeks` },
    { label: "Estimated annual HubSpot alternative", value: `$${Math.round(v.teamSize * 60 * 12).toLocaleString()}/yr` },
  ];
}

export function CrmCostCalc() {
  return (
    <CalculatorShell
      title="Estimate your CRM cost"
      description="Results are indicative ranges. Get a fixed-price quote from us after."
      fields={fields}
      compute={compute}
    />
  );
}
