"use client";

import { useEffect } from "react";

// Extend Navigator type for WebMCP (https://webmachinelearning.github.io/webmcp/)
declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (ctx: {
        tools: Array<{
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (input: Record<string, unknown>) => Promise<unknown>;
        }>;
      }) => void;
    };
  }
}

export function WebMCPProvider() {
  useEffect(() => {
    if (!navigator.modelContext) return;

    navigator.modelContext.provideContext({
      tools: [
        {
          name: "calculate_crm_roi",
          description:
            "Calculate the ROI of replacing spreadsheets or off-the-shelf tools with a custom Go-Orca CRM. Returns estimated annual savings, ROI percentage, and payback period.",
          inputSchema: {
            type: "object",
            properties: {
              team_size: { type: "number", description: "Number of people who will use the CRM" },
              hours_per_week_lost: { type: "number", description: "Hours lost per person per week due to inefficient tools" },
              average_hourly_rate: { type: "number", description: "Average hourly cost per employee in USD" },
              monthly_tool_costs: { type: "number", description: "Current monthly spend on CRM or SaaS tools in USD" },
              crm_investment: { type: "number", description: "Estimated one-time CRM build investment in USD" },
            },
            required: ["team_size", "hours_per_week_lost", "average_hourly_rate", "crm_investment"],
          },
          execute: async (input) => {
            const { team_size, hours_per_week_lost, average_hourly_rate, monthly_tool_costs = 0, crm_investment } = input as Record<string, number>;
            const annualTimeSavings = team_size * hours_per_week_lost * 52 * average_hourly_rate;
            const annualToolSavings = monthly_tool_costs * 12;
            const totalAnnualSavings = annualTimeSavings + annualToolSavings;
            const roi = ((totalAnnualSavings - crm_investment) / crm_investment) * 100;
            const paybackMonths = crm_investment / (totalAnnualSavings / 12);
            return {
              annual_savings_usd: Math.round(totalAnnualSavings),
              roi_percent: Math.round(roi),
              payback_months: Math.round(paybackMonths),
              breakdown: {
                time_savings_usd: Math.round(annualTimeSavings),
                tool_savings_usd: Math.round(annualToolSavings),
              },
            };
          },
        },
        {
          name: "calculate_cac",
          description:
            "Calculate Customer Acquisition Cost (CAC) given total marketing and sales spend and the number of new customers acquired in a period.",
          inputSchema: {
            type: "object",
            properties: {
              total_spend_usd: { type: "number", description: "Total marketing and sales spend for the period in USD" },
              new_customers: { type: "number", description: "Number of new customers acquired in the same period" },
            },
            required: ["total_spend_usd", "new_customers"],
          },
          execute: async (input) => {
            const { total_spend_usd, new_customers } = input as Record<string, number>;
            const cac = total_spend_usd / new_customers;
            return {
              cac_usd: Math.round(cac * 100) / 100,
              interpretation:
                cac < 100 ? "Low — strong organic or referral acquisition" :
                cac < 500 ? "Moderate — typical for SMB SaaS or services" :
                cac < 2000 ? "High — common in B2B with longer sales cycles" :
                "Very high — consider improving conversion or reducing spend",
            };
          },
        },
        {
          name: "estimate_crm_cost",
          description:
            "Estimate the cost range to build a custom CRM with Go-Orca based on team size, required modules, and number of integrations.",
          inputSchema: {
            type: "object",
            properties: {
              team_size: { type: "number", description: "Number of people who will use the CRM" },
              modules: {
                type: "array",
                items: { type: "string" },
                description: "Modules needed, e.g. ['pipeline', 'contacts', 'inbox', 'reports', 'automations']",
              },
              integrations_count: { type: "number", description: "Number of third-party integrations required" },
            },
            required: ["team_size", "modules"],
          },
          execute: async (input) => {
            const { team_size, modules, integrations_count = 0 } = input as { team_size: number; modules: string[]; integrations_count: number };
            const base = 4000;
            const perModule = 800;
            const perIntegration = 600;
            const teamMultiplier = team_size <= 5 ? 1 : team_size <= 20 ? 1.2 : team_size <= 100 ? 1.5 : 2;
            const estimate = (base + modules.length * perModule + integrations_count * perIntegration) * teamMultiplier;
            return {
              estimate_range: {
                low_usd: Math.round(estimate * 0.85 / 500) * 500,
                high_usd: Math.round(estimate * 1.15 / 500) * 500,
              },
              timeline_weeks: Math.round(4 + modules.length * 0.8 + integrations_count * 0.5),
              note: "Final pricing requires a scoping call. Get a fixed quote at go-orca.tech/contact",
            };
          },
        },
      ],
    });
  }, []);

  return null;
}
