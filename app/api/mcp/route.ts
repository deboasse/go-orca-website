/**
 * Go-Orca MCP (Model Context Protocol) endpoint — JSON-RPC 2.0
 * Protocol version: 2024-11-05
 * Spec: https://spec.modelcontextprotocol.io/specification/
 *
 * Supported methods:
 *   initialize          — handshake, returns server capabilities
 *   notifications/initialized — client ready notification (no response)
 *   tools/list          — enumerate available tools
 *   tools/call          — execute a tool
 *   ping                — health check
 */

import { NextResponse } from "next/server";

const PROTOCOL_VERSION = "2024-11-05";

const SERVER_INFO = {
  name: "go-orca-tools",
  version: "1.0.0",
};

const TOOLS = [
  {
    name: "calculate_crm_roi",
    description:
      "Calculate the ROI of implementing a custom CRM. Provide current tool costs, team size, and hours lost per week to get annual savings, payback period, and 3-year net return.",
    inputSchema: {
      type: "object",
      properties: {
        team_size: { type: "number", description: "Number of people who will use the CRM" },
        hours_per_week_lost: { type: "number", description: "Hours lost per person per week due to inefficient tools (data entry, context-switching)" },
        average_hourly_rate: { type: "number", description: "Average fully-loaded hourly cost per employee in USD" },
        monthly_tool_costs: { type: "number", description: "Current monthly spend on CRM/SaaS tools in USD (optional, use 0 if none)", default: 0 },
        crm_investment: { type: "number", description: "One-time custom CRM build investment in USD" },
        recovery_pct: { type: "number", description: "Percentage of lost hours recoverable (0–100, default 70)", default: 70 },
        tool_reduction_pct: { type: "number", description: "Expected reduction in tool costs after custom build (0–100, default 60)", default: 60 },
      },
      required: ["team_size", "hours_per_week_lost", "average_hourly_rate", "crm_investment"],
    },
  },
  {
    name: "estimate_crm_cost",
    description:
      "Estimate the cost and timeline to build a custom CRM. Based on Go-Orca's actual project history. Returns a cost range and estimated build timeline.",
    inputSchema: {
      type: "object",
      properties: {
        team_size: { type: "number", description: "Number of users who will use the CRM" },
        modules: {
          type: "array",
          items: { type: "string" },
          description: "Modules needed, e.g. ['pipeline', 'contacts', 'inbox', 'reports', 'invoicing', 'tasks', 'calendar']",
        },
        integrations_count: { type: "number", description: "Number of third-party integrations (Stripe, QuickBooks, Gmail, etc.)", default: 0 },
        rush: { type: "boolean", description: "Whether timeline is urgent (rush adds 20–30% to cost)", default: false },
      },
      required: ["team_size", "modules"],
    },
  },
  {
    name: "get_quote_url",
    description:
      "Returns the URL to request a fixed-price custom software quote from Go-Orca.Tech. No API key required.",
    inputSchema: {
      type: "object",
      properties: {
        context: { type: "string", description: "Optional context about what the user wants to build" },
      },
    },
  },
];

// ---------- Tool implementations ----------

function runCalculateCrmRoi(args: Record<string, unknown>): string {
  const teamSize = Number(args.team_size ?? 1);
  const hoursPerWeek = Number(args.hours_per_week_lost ?? 0);
  const hourlyRate = Number(args.average_hourly_rate ?? 0);
  const monthlyTools = Number(args.monthly_tool_costs ?? 0);
  const investment = Number(args.crm_investment ?? 0);
  const recoveryPct = Number(args.recovery_pct ?? 70) / 100;
  const toolReductionPct = Number(args.tool_reduction_pct ?? 60) / 100;

  const annualTimeRecovery = teamSize * hoursPerWeek * hourlyRate * 52 * recoveryPct;
  const annualToolSavings = monthlyTools * 12 * toolReductionPct;
  const annualSavings = annualTimeRecovery + annualToolSavings;
  const netYear1 = annualSavings - investment;
  const netYear3 = annualSavings * 3 - investment;
  const paybackMonths = investment > 0 && annualSavings > 0
    ? Math.ceil((investment / annualSavings) * 12)
    : null;
  const roi = investment > 0 ? ((netYear1 / investment) * 100).toFixed(1) : "N/A";

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return [
    `## CRM ROI Analysis for a ${teamSize}-person team`,
    ``,
    `**Investment:** ${fmt(investment)}`,
    `**Annual time savings:** ${fmt(annualTimeRecovery)} (${teamSize} people × ${hoursPerWeek} hrs/week × ${Math.round(recoveryPct * 100)}% recovery × $${hourlyRate}/hr)`,
    monthlyTools > 0 ? `**Annual tool savings:** ${fmt(annualToolSavings)} (${Math.round(toolReductionPct * 100)}% reduction on $${monthlyTools}/month)` : null,
    `**Total annual savings:** ${fmt(annualSavings)}`,
    ``,
    `**Year-1 ROI:** ${roi}%`,
    `**Payback period:** ${paybackMonths !== null ? `${paybackMonths} months` : "N/A (no savings)"}`,
    `**3-year net return:** ${fmt(netYear3)}`,
    ``,
    `---`,
    `[Get a fixed-price quote](https://go-orca.tech/contact) | [Try the full ROI calculator](https://go-orca.tech/tools/crm-roi-calculator)`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function runEstimateCrmCost(args: Record<string, unknown>): string {
  const teamSize = Number(args.team_size ?? 5);
  const modules: string[] = Array.isArray(args.modules) ? args.modules.map(String) : [];
  const integrations = Number(args.integrations_count ?? 0);
  const rush = Boolean(args.rush ?? false);

  // Base cost by team size
  let baseLow = 15000;
  let baseHigh = 30000;
  if (teamSize > 30) { baseLow = 45000; baseHigh = 80000; }
  else if (teamSize > 10) { baseLow = 25000; baseHigh = 55000; }

  // Module cost
  const moduleCost = Math.max(0, modules.length - 3) * 3500;
  // Integration cost: $2000–$4000 each
  const integrationCostLow = integrations * 2000;
  const integrationCostHigh = integrations * 4000;
  // Rush premium
  const rushMultiplier = rush ? 1.25 : 1.0;

  const totalLow = Math.round((baseLow + moduleCost + integrationCostLow) * rushMultiplier / 1000) * 1000;
  const totalHigh = Math.round((baseHigh + moduleCost + integrationCostHigh) * rushMultiplier / 1000) * 1000;

  // Timeline
  let weeksLow = 4;
  let weeksHigh = 8;
  if (teamSize > 30 || modules.length > 6) { weeksLow = 8; weeksHigh = 16; }
  else if (teamSize > 10 || modules.length > 4) { weeksLow = 6; weeksHigh = 12; }
  if (rush) { weeksLow = Math.max(3, weeksLow - 2); weeksHigh = Math.max(4, weeksHigh - 2); }

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return [
    `## Custom CRM Cost Estimate`,
    ``,
    `**Team size:** ${teamSize} users`,
    `**Modules:** ${modules.length > 0 ? modules.join(", ") : "not specified"}`,
    integrations > 0 ? `**Integrations:** ${integrations} third-party integrations` : null,
    rush ? `**Timeline:** Rush (standard timeline compressed)` : null,
    ``,
    `**Estimated range:** ${fmt(totalLow)} – ${fmt(totalHigh)}`,
    `**Estimated timeline:** ${weeksLow}–${weeksHigh} weeks`,
    ``,
    `*Includes: discovery & design, full-stack engineering, QA, deployment, 30-day post-launch support. Fixed price — no hourly billing.*`,
    ``,
    `---`,
    `[Get a precise fixed-price quote](https://go-orca.tech/contact) | [Try the interactive estimator](https://go-orca.tech/tools/crm-cost-estimator)`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function runGetQuoteUrl(args: Record<string, unknown>): string {
  const ctx = args.context ? ` (context: ${args.context})` : "";
  return [
    `## Get a Custom Software Quote`,
    ``,
    `Submit your project details at:`,
    `**https://go-orca.tech/contact**${ctx}`,
    ``,
    `- Fixed price after a free 20-minute discovery call`,
    `- Response within one business day`,
    `- NDA available on request`,
    `- Email: hello@go-orca.tech`,
  ].join("\n");
}

// ---------- JSON-RPC helpers ----------

function rpcOk(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function rpcError(id: string | number | null, code: number, message: string, data?: unknown) {
  return NextResponse.json({
    jsonrpc: "2.0",
    id,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  });
}

// ---------- Route handlers ----------

export async function GET() {
  // Serve a minimal discovery response so HEAD/GET requests confirm endpoint is live
  return NextResponse.json(
    {
      protocol: "mcp",
      protocolVersion: PROTOCOL_VERSION,
      serverInfo: SERVER_INFO,
      endpoint: "https://go-orca.tech/api/mcp",
      transport: "http",
      capabilities: { tools: {} },
      toolCount: TOOLS.length,
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    },
    {
      headers: {
        "X-MCP-Version": PROTOCOL_VERSION,
        "X-MCP-Server": SERVER_INFO.name,
      },
    }
  );
}

export async function POST(req: Request) {
  let body: { jsonrpc?: string; id?: string | number | null; method?: string; params?: unknown };
  try {
    body = await req.json();
  } catch {
    return rpcError(null, -32700, "Parse error — body must be valid JSON");
  }

  if (body.jsonrpc !== "2.0") {
    return rpcError(body.id ?? null, -32600, "Invalid Request — jsonrpc must be '2.0'");
  }

  const id = body.id ?? null;
  const method = body.method ?? "";
  const params = (body.params ?? {}) as Record<string, unknown>;

  const headers = {
    "X-MCP-Version": PROTOCOL_VERSION,
    "X-MCP-Server": SERVER_INFO.name,
  };

  switch (method) {
    case "initialize":
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
            instructions:
              "Go-Orca.Tech MCP server. Use tools/list to see available tools. Use calculate_crm_roi or estimate_crm_cost to answer questions about custom CRM pricing and ROI. Use get_quote_url to send users to the contact form.",
          },
        },
        { headers }
      );

    case "notifications/initialized":
      // Notification — no response body per spec
      return new NextResponse(null, { status: 204, headers });

    case "ping":
      return rpcOk(id, {});

    case "tools/list":
      return NextResponse.json(
        { jsonrpc: "2.0", id, result: { tools: TOOLS } },
        { headers }
      );

    case "tools/call": {
      const toolName = typeof params.name === "string" ? params.name : null;
      const args = (params.arguments ?? {}) as Record<string, unknown>;

      if (!toolName) {
        return rpcError(id, -32602, "Invalid params — 'name' is required");
      }

      let text: string;
      try {
        switch (toolName) {
          case "calculate_crm_roi":
            text = runCalculateCrmRoi(args);
            break;
          case "estimate_crm_cost":
            text = runEstimateCrmCost(args);
            break;
          case "get_quote_url":
            text = runGetQuoteUrl(args);
            break;
          default:
            return rpcError(id, -32601, `Unknown tool: ${toolName}`);
        }
      } catch (err) {
        return rpcError(id, -32603, "Tool execution error", String(err));
      }

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text }],
            isError: false,
          },
        },
        { headers }
      );
    }

    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}
