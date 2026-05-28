# crm-roi-calculator

Calculate the ROI of switching from spreadsheets or off-the-shelf SaaS to a custom Go-Orca CRM.

## Use When

- A user wants to know if a custom CRM investment makes financial sense
- A user asks about payback period or annual savings from custom software
- A user wants to compare their current SaaS costs vs a one-time build cost
- A user has team size, hours lost to manual work, and an approximate investment budget

## Constraints

- Inputs must include team_size, hours_per_week_lost, average_hourly_rate, and crm_investment
- monthly_tool_costs is optional (use 0 if not provided)
- recovery_pct defaults to 70% (realistic for most teams)
- Results are estimates based on Go-Orca's client averages; actual results vary

## Output

Returns:
- Annual time savings in USD
- Annual tool savings in USD (if monthly_tool_costs provided)
- Total annual savings
- Year-1 ROI percentage
- Payback period in months
- 3-year net return

## Endpoint

MCP tool via `tools/call` on `https://go-orca.tech/api/mcp` with `name: "calculate_crm_roi"`

## Example

```json
{
  "team_size": 10,
  "hours_per_week_lost": 5,
  "average_hourly_rate": 60,
  "monthly_tool_costs": 500,
  "crm_investment": 30000,
  "recovery_pct": 70
}
```

Returns: Annual savings ~$119,200, ROI 297%, payback ~3 months, 3-year net ~$327,600
