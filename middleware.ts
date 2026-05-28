import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Intercepts /robots.txt to inject Content-Signal directives
// (contentsignals.org draft spec) — not supported by MetadataRoute.Robots.
const ROBOTS = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: GPTBot
Allow: /
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Content Signals — https://contentsignals.org/
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: https://go-orca.tech/sitemap.xml
Schemamap: https://go-orca.tech/schemamap.xml
`;

// Static markdown for key pages — returned when Accept: text/markdown
// Enables Markdown for Agents (https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
const MARKDOWN: Record<string, string> = {
  "/": `# Go-Orca.Tech — Custom CRM & Software for Growing Businesses

Go-Orca builds custom CRM software, internal tools, and web applications for small and mid-sized businesses that have outgrown spreadsheets and off-the-shelf SaaS.

## Services
- **Custom CRM development** — purpose-built for your pipeline, not a generic template
- **Internal dashboards & admin tools** — replace fragmented spreadsheets with one source of truth
- **Client portals & onboarding systems** — give clients a branded, structured experience
- **Web & mobile app development** — from MVP to full product
- **Marketing technology integration** — connect your stack, eliminate manual data entry

## Free Tools
- [CRM ROI Calculator](https://go-orca.tech/tools/crm-roi-calculator) — see your annual savings and payback period
- [CAC Calculator](https://go-orca.tech/tools/cac-calculator) — calculate your true customer acquisition cost
- [CRM Cost Estimator](https://go-orca.tech/tools/crm-cost-estimator) — get a realistic build cost range
- [App Development Cost Guide](https://go-orca.tech/tools/app-development-cost) — real 2025 cost ranges

## Contact
[Get a custom quote](https://go-orca.tech/contact) | hello@go-orca.tech | Massachusetts, USA
`,

  "/about": `# About Go-Orca.Tech

Go-Orca is a software development agency based in Massachusetts, USA. We build custom CRM systems, internal tools, and web applications for fast-paced businesses across the US, France, and Hong Kong.

## What We Do
We replace spreadsheets and off-the-shelf SaaS tools with custom software built precisely around your workflow — so your team spends less time on manual data entry and more time on the work that grows the business.

## Clients We've Worked With
- **De'Angele Group** — technical marketing operations, 4+ year partnership
- **Premier Fence Wholesale** — custom wholesale website and martech stack
- **Bux Diamantaire** — custom inventory, client, and sales management app
- **Private Capital Co.** — multi-project finance software (NDA)
- **Private Healthcare Agency** — 8+ month engagement (NDA)

## Team
Founded by Vinny Deboasse and Natalia. Based in Massachusetts, USA.

## Contact
hello@go-orca.tech | [go-orca.tech](https://go-orca.tech)
`,

  "/tools": `# Go-Orca Free Business Tools

Free calculators and cost guides for business operators evaluating custom software. No sign-up required, instant results.

## Calculators

### [CRM ROI Calculator](https://go-orca.tech/tools/crm-roi-calculator)
Enter your team size, current tool costs, and hours lost per week. Get annual savings, payback period, and 3-year ROI instantly.

### [Customer Acquisition Cost (CAC) Calculator](https://go-orca.tech/tools/cac-calculator)
Enter total marketing + sales spend and new customers acquired. Get CAC, LTV:CAC ratio, and payback period.

### [Custom CRM Cost Estimator](https://go-orca.tech/tools/crm-cost-estimator)
Adjust team size, modules, and integrations. Get a realistic build cost range and timeline.

## Cost Guides

### [App Development Cost Guide 2025](https://go-orca.tech/tools/app-development-cost)
Real cost ranges from MVP ($8k–$25k) to full product ($60k–$180k), based on Go-Orca's actual project history.

### [Go-Orca vs HubSpot](https://go-orca.tech/tools/go-orca-vs-hubspot)
Side-by-side comparison of custom CRM vs HubSpot for teams of 5–50.

### [Go-Orca vs Salesforce](https://go-orca.tech/tools/go-orca-vs-salesforce)
Custom CRM vs Salesforce — when does switching make sense?

### [Spreadsheet vs CRM](https://go-orca.tech/tools/spreadsheet-vs-crm)
When spreadsheets stop working and what to do about it.

### [Custom vs Off-the-Shelf](https://go-orca.tech/tools/custom-vs-off-the-shelf)
Decision framework for choosing between a custom build and an off-the-shelf tool.
`,

  "/contact": `# Contact Go-Orca.Tech

Request a custom quote for your software project.

**Email:** hello@go-orca.tech
**Location:** Massachusetts, USA
**Response time:** One business day

## What Happens After You Submit
1. A founder personally reviews your answers
2. We prepare a custom quote and scope
3. We reach out to schedule a 20-minute walkthrough

[Get a custom quote](https://go-orca.tech/contact)
`,

  "/tools/crm-roi-calculator": `# CRM ROI Calculator — Go-Orca.Tech

Free tool to calculate the ROI of investing in a custom CRM vs your current spreadsheets or off-the-shelf tools.

## How to Use
1. Enter your team size
2. Enter monthly SaaS subscription costs
3. Enter hours lost per week to manual data work
4. Enter an estimated investment cost

## Output
- Annual savings ($)
- ROI percentage
- Payback period (months)
- 3-year net return

## Formula
**ROI** = (Annual Savings − Investment Cost) ÷ Investment Cost × 100
**Annual Savings** = (Hours Lost × Hourly Rate × 52 × Recovery %) + (SaaS × 12 × Reduction %)

## When Custom CRM Beats HubSpot/Salesforce
- Team size 5–200 people
- Paying $500+/month for tools you're only half-using
- Losing deals or customers due to data falling through the cracks
- Workflow doesn't fit the standard CRM mold

**Free. No sign-up required.**
[Try the calculator](https://go-orca.tech/tools/crm-roi-calculator) | [Get a custom quote](https://go-orca.tech/contact)
`,

  "/tools/cac-calculator": `# Customer Acquisition Cost (CAC) Calculator — Go-Orca.Tech

Free tool to calculate your true Customer Acquisition Cost.

## Formula
**CAC** = (Total Marketing Spend + Total Sales Costs) ÷ New Customers Acquired

## Outputs
- CAC (Customer Acquisition Cost)
- LTV:CAC ratio (healthy = 3:1 or higher)
- Payback period in months

## What Counts as Marketing + Sales Spend
- Ad spend (Google, Meta, LinkedIn, etc.)
- Salesperson salaries and commissions
- Marketing tools and subscriptions
- Content production costs

**Free. No sign-up required.**
[Try the calculator](https://go-orca.tech/tools/cac-calculator) | [Get a custom quote](https://go-orca.tech/contact)
`,

  "/tools/crm-cost-estimator": `# Custom CRM Cost Estimator — Go-Orca.Tech

Free tool to estimate the cost of building a custom CRM for your business.

## Inputs
- Team size (number of users)
- Number of modules (contacts, pipeline, invoicing, etc.)
- Number of integrations (Stripe, QuickBooks, Gmail, etc.)
- Timeline preference (standard vs. rush)

## Typical Cost Ranges
| Team Size | Range |
|---|---|
| 5–10 people | $15,000–$30,000 |
| 10–30 people | $25,000–$55,000 |
| 30+ people | $45,000–$80,000+ |

## Key Cost Drivers
- Number of modules
- Third-party integrations
- Permission complexity
- Timeline pressure (rush adds 20–30%)

**Free. No sign-up required.**
[Try the estimator](https://go-orca.tech/tools/crm-cost-estimator) | [Get a fixed-price quote](https://go-orca.tech/contact)
`,

  "/tools/app-development-cost": `# Custom App Development Cost Guide 2025 — Go-Orca.Tech

Real cost ranges for building custom web and mobile apps in 2025, based on Go-Orca's actual project history.

## Cost Ranges

| App Type | Range | Timeline |
|---|---|---|
| MVP / Prototype | $8,000–$25,000 | 2–5 weeks |
| Web App (internal tool) | $15,000–$45,000 | 4–10 weeks |
| Customer-facing web app | $25,000–$75,000 | 6–14 weeks |
| Mobile app (iOS + Android) | $35,000–$100,000 | 8–20 weeks |
| Full product (web + mobile) | $60,000–$180,000 | 14–28 weeks |

## Key Cost Drivers
- **Features/screens** — each distinct area adds 1–3 weeks
- **Design complexity** — fully custom UI adds 20–40% vs component library
- **Integrations** — each third-party API adds $1,500–$5,000
- **Platform** — web-only cheapest; adding iOS + Android adds 30–50%
- **Compliance** — HIPAA, SOC 2, GDPR adds 20–40% to infrastructure cost

## How Go-Orca Prices Projects
Fixed price after a 20-minute discovery call. Covers design, engineering, QA, deployment, and 30 days of post-launch support. No hourly billing, no surprises.

[Get a fixed-price quote](https://go-orca.tech/contact)
`,
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Serve robots.txt with Content-Signal directive
  if (pathname === "/robots.txt") {
    return new NextResponse(ROBOTS, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Agent mode — return stripped markdown for ?mode=agent
  const mode = request.nextUrl.searchParams.get("mode");
  if (mode === "agent") {
    const md = MARKDOWN[pathname] ?? MARKDOWN["/"];
    if (md) {
      return new NextResponse(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "X-Agent-Mode": "true",
          "Vary": "Accept",
        },
      });
    }
  }

  // Serve .md suffix as explicit markdown URL (e.g. /index.md → /, /about.md → /about)
  if (pathname.endsWith(".md")) {
    const basePath = pathname === "/index.md" ? "/" : pathname.slice(0, -3);
    const md = MARKDOWN[basePath];
    if (md) {
      const wordCount = md.split(/\s+/).length;
      return new NextResponse(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "x-markdown-tokens": String(wordCount),
        },
      });
    }
  }

  // Markdown content negotiation for AI agents
  // Spec: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    const md = MARKDOWN[pathname];
    if (md) {
      const wordCount = md.split(/\s+/).length;
      return new NextResponse(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "x-markdown-tokens": String(wordCount),
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/robots.txt",
    "/",
    "/index.md",
    "/about",
    "/about.md",
    "/tools",
    "/tools.md",
    "/tools/:path*",
    "/contact",
    "/contact.md",
  ],
};
