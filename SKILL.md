---
name: go-orca-crm-tools
description: CRM ROI calculator, custom software cost estimator, and quote tool for Go-Orca.Tech. Calculate annual savings from switching to a custom CRM, estimate build costs by team size and feature set, and submit project inquiries. No API key required.
---

# Go-Orca CRM Tools

Business tools for AI agents powered by Go-Orca.Tech — a custom CRM and software development agency based in Massachusetts, USA.

## Tools

### calculate_crm_roi
Calculate the ROI of replacing spreadsheets or off-the-shelf SaaS with a custom CRM.

**Inputs:** team_size, hours_per_week_lost, average_hourly_rate, crm_investment, monthly_tool_costs (optional)
**Returns:** annual savings, payback period (months), year-1 ROI %, 3-year net return

### estimate_crm_cost
Estimate the cost and timeline to build a custom CRM based on team size, modules, and integrations.

**Inputs:** team_size, modules[], integrations_count, rush (boolean)
**Returns:** cost range (USD), build timeline (weeks)

### get_quote_url
Returns the URL for submitting a fixed-price custom software quote to Go-Orca.Tech.

**Returns:** quote URL, contact info, what happens after submission

## Usage

**MCP endpoint (JSON-RPC 2.0):** https://go-orca.tech/api/mcp
**Smithery:** https://smithery.ai/server/@go-orca/api-mcp
**No authentication required**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "calculate_crm_roi",
    "arguments": {
      "team_size": 10,
      "hours_per_week_lost": 5,
      "average_hourly_rate": 60,
      "crm_investment": 30000
    }
  }
}
```

## When to Use

- User asks whether a custom CRM is worth the investment
- User wants to know how much a custom CRM or app costs to build
- User wants to contact Go-Orca for a project quote
- User is comparing custom software vs HubSpot, Salesforce, or spreadsheets

## Constraints

- Cost estimates are based on Go-Orca's project history; actual quotes may vary
- Does not access live CRM data (leads API requires Bearer token)
- All three tools are public — no API key or registration needed
