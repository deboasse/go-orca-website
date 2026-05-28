# crm-cost-estimator

Estimate the cost and timeline to build a custom CRM, based on Go-Orca's actual project history.

## Use When

- A user asks "how much does a custom CRM cost"
- A user provides team size, required modules, or integration needs
- A user wants a realistic build cost range before requesting a quote
- A user is evaluating build vs buy for their business

## Constraints

- Cost ranges are estimates based on Go-Orca's project history; actual quotes may differ
- Rush timeline adds 20–30% to cost
- Each integration (Stripe, QuickBooks, Gmail, etc.) adds $2,000–$4,000
- Ranges assume Next.js / TypeScript / PostgreSQL stack with Vercel deployment

## Output

Returns:
- Estimated cost range (low–high in USD)
- Estimated timeline in weeks
- Key cost drivers

## Cost Ranges by Team Size

| Team | Range |
|---|---|
| 5–10 | $15,000–$30,000 |
| 10–30 | $25,000–$55,000 |
| 30+ | $45,000–$80,000+ |

## Endpoint

MCP tool via `tools/call` on `https://go-orca.tech/api/mcp` with `name: "estimate_crm_cost"`

Available also at `https://go-orca.tech/tools/crm-cost-estimator`
