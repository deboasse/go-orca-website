/**
 * Go-Orca MCP (Model Context Protocol) endpoint — JSON-RPC 2.0
 * Protocol version: 2024-11-05
 * Spec: https://spec.modelcontextprotocol.io/specification/
 *
 * Supported methods:
 *   initialize                    — handshake, returns server capabilities
 *   notifications/initialized     — client ready notification (no response)
 *   tools/list                    — enumerate available tools
 *   tools/call                    — execute a tool
 *   resources/list                — enumerate ui:// resources (MCP Apps)
 *   resources/read                — return UI resource content (HTML widget)
 *   ping                          — health check
 */

import { NextResponse } from "next/server";

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_INFO = { name: "go-orca-tools", version: "1.0.0" };

// ---------- Tools ----------

const TOOLS = [
  {
    name: "calculate_crm_roi",
    description:
      "Calculate the ROI of implementing a custom CRM. Provide current tool costs, team size, and hours lost per week to get annual savings, payback period, and 3-year net return.",
    inputSchema: {
      type: "object",
      properties: {
        team_size: { type: "number", description: "Number of people who will use the CRM" },
        hours_per_week_lost: { type: "number", description: "Hours lost per person per week due to inefficient tools" },
        average_hourly_rate: { type: "number", description: "Average fully-loaded hourly cost per employee in USD" },
        monthly_tool_costs: { type: "number", description: "Current monthly spend on CRM/SaaS tools in USD (use 0 if none)", default: 0 },
        crm_investment: { type: "number", description: "One-time custom CRM build investment in USD" },
        recovery_pct: { type: "number", description: "Percentage of lost hours recoverable (0–100, default 70)", default: 70 },
        tool_reduction_pct: { type: "number", description: "Expected reduction in tool costs (0–100, default 60)", default: 60 },
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
        integrations_count: { type: "number", description: "Number of third-party integrations", default: 0 },
        rush: { type: "boolean", description: "Whether timeline is urgent (rush adds 20–30% to cost)", default: false },
      },
      required: ["team_size", "modules"],
    },
  },
  {
    name: "get_quote_url",
    description: "Returns the URL to request a fixed-price custom software quote from Go-Orca.Tech. No API key required.",
    inputSchema: {
      type: "object",
      properties: {
        context: { type: "string", description: "Optional context about what the user wants to build" },
      },
    },
  },
];

// ---------- Resources (MCP Apps UI) ----------

const RESOURCES = [
  {
    uri: "ui://crm-roi-calculator",
    name: "CRM ROI Calculator",
    description: "Interactive calculator: enter team size, hours lost, and investment to get annual savings and payback period.",
    mimeType: "text/html",
  },
  {
    uri: "ui://crm-cost-estimator",
    name: "CRM Cost Estimator",
    description: "Interactive estimator: select team size and modules to get a custom CRM build cost range.",
    mimeType: "text/html",
  },
];

// ---------- HTML widgets ----------

const ROI_WIDGET = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'none'">
<meta name="color-scheme" content="dark light">
<title>CRM ROI Calculator — Go-Orca.Tech</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0d14;color:#e5e5e5;padding:20px;font-size:14px}
h1{font-size:16px;font-weight:600;margin-bottom:4px;color:#fff}
p.sub{font-size:12px;color:#888;margin-bottom:20px}
label{display:block;font-size:12px;color:#aaa;margin-bottom:4px;margin-top:14px}
input{width:100%;background:#1a1a2e;border:1px solid #2a2a4a;border-radius:6px;padding:8px 10px;color:#fff;font-size:14px;outline:none}
input:focus{border-color:#7c3aed}
button{margin-top:20px;width:100%;background:#7c3aed;color:#fff;border:none;border-radius:6px;padding:10px;font-size:14px;font-weight:600;cursor:pointer}
button:hover{background:#6d28d9}
#result{margin-top:20px;display:none}
.card{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:8px;padding:16px;margin-bottom:10px}
.stat{font-size:24px;font-weight:700;color:#7c3aed}
.stat-label{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
a{color:#7c3aed;text-decoration:none;font-size:12px}
</style>
</head>
<body>
<h1>CRM ROI Calculator</h1>
<p class="sub">Go-Orca.Tech — Custom CRM & Software</p>
<label>Team size (people)</label>
<input type="number" id="team" value="10" min="1">
<label>Hours lost per person per week</label>
<input type="number" id="hours" value="5" min="0" step="0.5">
<label>Average hourly rate (USD)</label>
<input type="number" id="rate" value="60" min="0">
<label>Monthly SaaS tool costs (USD)</label>
<input type="number" id="tools" value="500" min="0">
<label>CRM investment (USD)</label>
<input type="number" id="invest" value="30000" min="0">
<button onclick="calc()">Calculate ROI</button>
<div id="result">
  <div class="grid">
    <div class="card"><div class="stat" id="savings"></div><div class="stat-label">Annual savings</div></div>
    <div class="card"><div class="stat" id="roi"></div><div class="stat-label">Year-1 ROI</div></div>
    <div class="card"><div class="stat" id="payback"></div><div class="stat-label">Payback period</div></div>
    <div class="card"><div class="stat" id="net3"></div><div class="stat-label">3-year net return</div></div>
  </div>
  <p style="margin-top:14px;text-align:center"><a href="https://go-orca.tech/contact">Get a fixed-price quote →</a></p>
</div>
<script>
function fmt(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)}
function calc(){
  var team=+document.getElementById('team').value;
  var hours=+document.getElementById('hours').value;
  var rate=+document.getElementById('rate').value;
  var tools=+document.getElementById('tools').value;
  var invest=+document.getElementById('invest').value;
  var timeSave=team*hours*rate*52*0.7;
  var toolSave=tools*12*0.6;
  var annual=timeSave+toolSave;
  var roi=invest>0?((annual-invest)/invest*100).toFixed(0)+'%':'N/A';
  var payback=annual>0?Math.ceil(invest/annual*12)+' mo':'N/A';
  var net3=annual*3-invest;
  document.getElementById('savings').textContent=fmt(annual);
  document.getElementById('roi').textContent=roi;
  document.getElementById('payback').textContent=payback;
  document.getElementById('net3').textContent=fmt(net3);
  document.getElementById('result').style.display='block';
}
</script>
</body>
</html>`;

const COST_WIDGET = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; form-action 'none'">
<meta name="color-scheme" content="dark light">
<title>CRM Cost Estimator — Go-Orca.Tech</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0d14;color:#e5e5e5;padding:20px;font-size:14px}
h1{font-size:16px;font-weight:600;margin-bottom:4px;color:#fff}
p.sub{font-size:12px;color:#888;margin-bottom:20px}
label{display:block;font-size:12px;color:#aaa;margin-bottom:6px;margin-top:14px}
select,input{width:100%;background:#1a1a2e;border:1px solid #2a2a4a;border-radius:6px;padding:8px 10px;color:#fff;font-size:14px;outline:none}
select:focus,input:focus{border-color:#7c3aed}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px}
.check{display:flex;align-items:center;gap:8px;background:#1a1a2e;border:1px solid #2a2a4a;border-radius:6px;padding:8px 10px;cursor:pointer}
.check input{width:auto}
.check span{font-size:13px}
button{margin-top:20px;width:100%;background:#7c3aed;color:#fff;border:none;border-radius:6px;padding:10px;font-size:14px;font-weight:600;cursor:pointer}
button:hover{background:#6d28d9}
#result{margin-top:20px;display:none}
.card{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:8px;padding:16px;margin-bottom:10px}
.range{font-size:22px;font-weight:700;color:#7c3aed}
.stat-label{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
a{color:#7c3aed;text-decoration:none;font-size:12px}
</style>
</head>
<body>
<h1>CRM Cost Estimator</h1>
<p class="sub">Go-Orca.Tech — Custom CRM & Software</p>
<label>Team size</label>
<select id="size">
  <option value="small">5–10 people</option>
  <option value="mid" selected>10–30 people</option>
  <option value="large">30+ people</option>
</select>
<label>Modules needed</label>
<div class="checks">
  <label class="check"><input type="checkbox" value="pipeline" checked><span>Pipeline</span></label>
  <label class="check"><input type="checkbox" value="contacts" checked><span>Contacts</span></label>
  <label class="check"><input type="checkbox" value="inbox"><span>Inbox</span></label>
  <label class="check"><input type="checkbox" value="reports"><span>Reports</span></label>
  <label class="check"><input type="checkbox" value="invoicing"><span>Invoicing</span></label>
  <label class="check"><input type="checkbox" value="tasks"><span>Tasks</span></label>
  <label class="check"><input type="checkbox" value="calendar"><span>Calendar</span></label>
  <label class="check"><input type="checkbox" value="portal"><span>Client portal</span></label>
</div>
<label>Third-party integrations</label>
<input type="number" id="ints" value="2" min="0" max="20">
<button onclick="calc()">Estimate cost</button>
<div id="result">
  <div class="card">
    <div class="range" id="range"></div>
    <div class="stat-label">Estimated build cost</div>
  </div>
  <div class="card">
    <div class="range" id="timeline"></div>
    <div class="stat-label">Estimated timeline</div>
  </div>
  <p style="font-size:12px;color:#888;margin-bottom:12px">Includes design, engineering, QA, deployment, 30-day support. Fixed price.</p>
  <p style="text-align:center"><a href="https://go-orca.tech/contact">Get a precise fixed-price quote →</a></p>
</div>
<script>
function fmt(n){return '$'+n.toLocaleString()}
function calc(){
  var size=document.getElementById('size').value;
  var ints=+document.getElementById('ints').value;
  var mods=[...document.querySelectorAll('.checks input:checked')].length;
  var low=size==='small'?15000:size==='mid'?25000:45000;
  var high=size==='small'?30000:size==='mid'?55000:80000;
  var wl=size==='small'?4:size==='mid'?6:8;
  var wh=size==='small'?8:size==='mid'?12:16;
  var extra=Math.max(0,mods-3)*3500;
  var intLow=ints*2000,intHigh=ints*4000;
  low=Math.round((low+extra+intLow)/1000)*1000;
  high=Math.round((high+extra+intHigh)/1000)*1000;
  document.getElementById('range').textContent=fmt(low)+' – '+fmt(high);
  document.getElementById('timeline').textContent=(wl+Math.round(ints*0.5))+' – '+(wh+Math.round(ints*0.5))+' weeks';
  document.getElementById('result').style.display='block';
}
</script>
</body>
</html>`;

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
  const paybackMonths = investment > 0 && annualSavings > 0 ? Math.ceil((investment / annualSavings) * 12) : null;
  const roi = investment > 0 ? ((netYear1 / investment) * 100).toFixed(1) : "N/A";
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return [
    `## CRM ROI Analysis for a ${teamSize}-person team`,
    ``,
    `**Investment:** ${fmt(investment)}`,
    `**Annual time savings:** ${fmt(annualTimeRecovery)}`,
    monthlyTools > 0 ? `**Annual tool savings:** ${fmt(annualToolSavings)}` : null,
    `**Total annual savings:** ${fmt(annualSavings)}`,
    ``,
    `**Year-1 ROI:** ${roi}%`,
    `**Payback period:** ${paybackMonths !== null ? `${paybackMonths} months` : "N/A"}`,
    `**3-year net return:** ${fmt(netYear3)}`,
    ``,
    `---`,
    `[Get a fixed-price quote](https://go-orca.tech/contact) | [Interactive calculator](https://go-orca.tech/tools/crm-roi-calculator)`,
  ].filter((l) => l !== null).join("\n");
}

function runEstimateCrmCost(args: Record<string, unknown>): string {
  const teamSize = Number(args.team_size ?? 5);
  const modules: string[] = Array.isArray(args.modules) ? args.modules.map(String) : [];
  const integrations = Number(args.integrations_count ?? 0);
  const rush = Boolean(args.rush ?? false);

  let baseLow = 15000, baseHigh = 30000;
  if (teamSize > 30) { baseLow = 45000; baseHigh = 80000; }
  else if (teamSize > 10) { baseLow = 25000; baseHigh = 55000; }

  const moduleCost = Math.max(0, modules.length - 3) * 3500;
  const rushMultiplier = rush ? 1.25 : 1.0;
  const totalLow = Math.round((baseLow + moduleCost + integrations * 2000) * rushMultiplier / 1000) * 1000;
  const totalHigh = Math.round((baseHigh + moduleCost + integrations * 4000) * rushMultiplier / 1000) * 1000;

  let weeksLow = 4, weeksHigh = 8;
  if (teamSize > 30 || modules.length > 6) { weeksLow = 8; weeksHigh = 16; }
  else if (teamSize > 10 || modules.length > 4) { weeksLow = 6; weeksHigh = 12; }

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return [
    `## Custom CRM Cost Estimate`,
    ``,
    `**Team size:** ${teamSize} users | **Modules:** ${modules.length > 0 ? modules.join(", ") : "not specified"}`,
    integrations > 0 ? `**Integrations:** ${integrations}` : null,
    ``,
    `**Estimated range:** ${fmt(totalLow)} – ${fmt(totalHigh)}`,
    `**Estimated timeline:** ${weeksLow}–${weeksHigh} weeks`,
    ``,
    `*Fixed price — includes design, engineering, QA, deployment, 30-day post-launch support.*`,
    ``,
    `---`,
    `[Get a precise fixed-price quote](https://go-orca.tech/contact) | [Interactive estimator](https://go-orca.tech/tools/crm-cost-estimator)`,
  ].filter((l) => l !== null).join("\n");
}

function runGetQuoteUrl(args: Record<string, unknown>): string {
  const ctx = args.context ? ` (context: ${args.context})` : "";
  return [
    `## Get a Custom Software Quote`,
    ``,
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
    jsonrpc: "2.0", id,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  });
}

const MCP_HEADERS = {
  "X-MCP-Version": PROTOCOL_VERSION,
  "X-MCP-Server": SERVER_INFO.name,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ---------- Route handlers ----------

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: MCP_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      protocol: "mcp",
      protocolVersion: PROTOCOL_VERSION,
      serverInfo: SERVER_INFO,
      endpoint: "https://go-orca.tech/api/mcp",
      transport: "http",
      registry: "https://smithery.ai/server/@go-orca/api-mcp",
      capabilities: { tools: {}, resources: {} },
      toolCount: TOOLS.length,
      resourceCount: RESOURCES.length,
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      resources: RESOURCES,
    },
    { headers: MCP_HEADERS }
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

  switch (method) {
    case "initialize":
      return NextResponse.json(
        {
          jsonrpc: "2.0", id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {}, resources: {} },
            serverInfo: SERVER_INFO,
            instructions:
              "Go-Orca.Tech MCP server. Tools: calculate_crm_roi, estimate_crm_cost, get_quote_url. Resources (MCP Apps UI): ui://crm-roi-calculator, ui://crm-cost-estimator. No authentication required.",
          },
        },
        { headers: MCP_HEADERS }
      );

    case "notifications/initialized":
      return new NextResponse(null, { status: 204, headers: MCP_HEADERS });

    case "ping":
      return NextResponse.json({ jsonrpc: "2.0", id, result: {} }, { headers: MCP_HEADERS });

    case "tools/list":
      return NextResponse.json({ jsonrpc: "2.0", id, result: { tools: TOOLS } }, { headers: MCP_HEADERS });

    case "resources/list":
      return NextResponse.json({ jsonrpc: "2.0", id, result: { resources: RESOURCES } }, { headers: MCP_HEADERS });

    case "resources/read": {
      const uri = typeof params.uri === "string" ? params.uri : null;
      if (!uri) return rpcError(id, -32602, "Invalid params — 'uri' is required");

      let html: string;
      if (uri === "ui://crm-roi-calculator") html = ROI_WIDGET;
      else if (uri === "ui://crm-cost-estimator") html = COST_WIDGET;
      else return rpcError(id, -32601, `Unknown resource: ${uri}`);

      return NextResponse.json(
        { jsonrpc: "2.0", id, result: { contents: [{ uri, mimeType: "text/html", text: html }] } },
        { headers: MCP_HEADERS }
      );
    }

    case "tools/call": {
      const toolName = typeof params.name === "string" ? params.name : null;
      const args = (params.arguments ?? {}) as Record<string, unknown>;

      if (!toolName) return rpcError(id, -32602, "Invalid params — 'name' is required");

      let text: string;
      let uiResource: string | null = null;

      try {
        switch (toolName) {
          case "calculate_crm_roi":
            text = runCalculateCrmRoi(args);
            uiResource = "ui://crm-roi-calculator";
            break;
          case "estimate_crm_cost":
            text = runEstimateCrmCost(args);
            uiResource = "ui://crm-cost-estimator";
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
          jsonrpc: "2.0", id,
          result: {
            content: [{ type: "text", text }],
            isError: false,
            ...(uiResource ? { _meta: { ui: uiResource } } : {}),
          },
        },
        { headers: MCP_HEADERS }
      );
    }

    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}
