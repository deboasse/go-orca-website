import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Resources",
  description:
    "Go-Orca developer resources: OpenAPI spec, agent auth guide, llms.txt, MCP server card, A2A agent card, and API catalog. Everything agents and developers need to integrate with the Go-Orca API.",
  openGraph: {
    title: "Go-Orca Developer Resources",
    description:
      "OpenAPI spec, agent auth guide, llms.txt, MCP server card, and API catalog for the Go-Orca platform.",
  },
};

const resources = [
  {
    section: "API Reference",
    items: [
      {
        title: "OpenAPI 3.1 Specification",
        href: "/openapi.json",
        type: "application/vnd.oai.openapi+json",
        desc: "Full machine-readable API spec. Covers agent auth registration, leads API (GET/PATCH), and quote submission (POST). Includes request/response schemas, error model, rate-limit headers, and Bearer auth.",
      },
      {
        title: "API Catalog",
        href: "/.well-known/api-catalog",
        type: "application/linkset+json",
        desc: "RFC 9727-compliant catalog linking all service descriptions, including the OpenAPI spec. Suitable for automated API discovery tooling.",
      },
    ],
  },
  {
    section: "Agent Auth",
    items: [
      {
        title: "Auth Guide (auth.md)",
        href: "/auth.md",
        type: "text/markdown",
        desc: "Human- and agent-readable registration guide. Covers the full flow: discover → register → claim → use → revoke. Supports anonymous, id-jag, and email identity_assertion flows. Rate limits, error codes, and revocation events documented.",
      },
      {
        title: "OAuth Authorization Server Metadata",
        href: "/.well-known/oauth-authorization-server",
        type: "application/json",
        desc: "RFC 8414 metadata document with agent_auth extension block. Declares register_uri, claim_uri, revocation_uri, identity_types_supported, and events_supported.",
      },
      {
        title: "OAuth Protected Resource Metadata",
        href: "/.well-known/oauth-protected-resource",
        type: "application/json",
        desc: "RFC 9728 metadata for the protected resource server. Returned via WWW-Authenticate on 401 responses from all secured API routes.",
      },
    ],
  },
  {
    section: "Agent Discovery",
    items: [
      {
        title: "llms.txt",
        href: "/llms.txt",
        type: "text/plain",
        desc: "Standard llms.txt file listing services, free tools, documentation links, and legal pages. Optimized for LLM context injection.",
      },
      {
        title: "llms-full.txt",
        href: "/llms-full.txt",
        type: "text/plain",
        desc: "Full content dump including homepage prose, about page, contact, auth overview, tool descriptions, and API quick reference. For agents that want complete site context in one file.",
      },
      {
        title: "Agent Skills Index",
        href: "/.well-known/agent-skills/index.json",
        type: "application/json",
        desc: "agentskills.io discovery index (schema v0.2.0). Lists available agent skills: CRM ROI Calculator, Leads API, and Quote Request.",
      },
      {
        title: "A2A Agent Card",
        href: "/.well-known/agent-card.json",
        type: "application/json",
        desc: "Agent-to-Agent protocol card declaring the platform's capabilities, skills, and endpoint metadata for A2A-compatible orchestration.",
      },
      {
        title: "MCP Server Card",
        href: "/.well-known/mcp/server-card.json",
        type: "application/json",
        desc: "Model Context Protocol server card. Describes the MCP endpoint name, version, and capabilities for MCP-compatible AI clients.",
      },
      {
        title: "Smithery Registry Listing",
        href: "https://smithery.ai/server/@go-orca/api-mcp",
        type: "MCP registry",
        desc: "Official Go-Orca MCP server listing on Smithery. Install directly from the registry or use the serverUrl https://go-orca.tech/api/mcp for direct JSON-RPC 2.0 access.",
      },
      {
        title: "Schema Map",
        href: "/schemamap.xml",
        type: "application/xml",
        desc: "NLWeb schema type map (schemamap.xml). Linked from robots.txt via the Schemamap: directive for schema-aware crawlers.",
      },
    ],
  },
  {
    section: "Quick Start",
    items: [
      {
        title: "Get a Quote (no auth required)",
        href: "/api/quote",
        type: "POST · application/json",
        desc: "Submit a project inquiry. Body: { name, email, company?, message }. Returns 201 with a lead ID. No API key needed.",
      },
      {
        title: "Register an Agent Credential",
        href: "/api/agent/auth",
        type: "POST · application/json",
        desc: "Obtain a Bearer token. Anonymous: { identity_type: 'anonymous' }. Returns { credential, type: 'api_key', expires_in }. Then use Authorization: Bearer <credential> on protected routes.",
      },
      {
        title: "List Leads (requires Bearer token)",
        href: "/api/leads",
        type: "GET · Bearer",
        desc: "Returns paginated leads from the CRM. Query params: status (new|contacted|qualified|converted|closed), limit (max 200). 401 includes WWW-Authenticate: Bearer resource_metadata=... for auto-discovery.",
      },
    ],
  },
];

export default function Developers() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">
        Developer Resources
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Go-Orca Developer &amp; Agent Resources
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Everything developers and AI agents need to integrate with the Go-Orca platform. The API supports anonymous
        and identity-asserted agent authentication, a full OpenAPI 3.1 spec, and standard agent discovery files
        including llms.txt, A2A agent card, and MCP server card.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/openapi.json"
          className="btn-base btn-primary text-sm"
          target="_blank"
          rel="noopener"
        >
          OpenAPI Spec →
        </Link>
        <Link href="/auth.md" className="btn-base btn-secondary text-sm">
          Auth Guide
        </Link>
        <Link href="/llms.txt" className="btn-base btn-secondary text-sm">
          llms.txt
        </Link>
      </div>

      {resources.map(({ section, items }) => (
        <section key={section} className="mt-16 border-t border-border pt-10">
          <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">
            {section}
          </p>
          <ul className="mt-6 space-y-6">
            {items.map((item) => (
              <li key={item.href} className="rounded-lg border border-border bg-surface/40 p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <Link
                    href={item.href}
                    className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener" : undefined}
                  >
                    {item.title}
                  </Link>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <p className="mt-2 font-mono text-[11px] text-primary/70">
                  {item.href}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-16 border-t border-border pt-10">
        <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">
          Rate Limits
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 pr-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Scope</th>
                <th className="pb-3 pr-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Limit</th>
                <th className="pb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Header</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { scope: "Per IP (any endpoint)", limit: "60 req / min", header: "X-RateLimit-Limit" },
                { scope: "Per credential", limit: "120 req / min", header: "X-RateLimit-Remaining" },
                { scope: "Agent registrations", limit: "10 / hr per IP", header: "X-RateLimit-Reset" },
              ].map((r) => (
                <tr key={r.scope}>
                  <td className="py-3 pr-6 text-foreground">{r.scope}</td>
                  <td className="py-3 pr-6 font-mono text-primary">{r.limit}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{r.header}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          All rate-limited responses return HTTP 429 with a <code className="font-mono text-xs">Retry-After</code> header.
          Credential-based limits are tracked server-side and reset on a rolling 60-second window.
        </p>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">
          Support
        </p>
        <p className="mt-4 text-muted-foreground">
          Questions about the API, auth flows, or agent integration?{" "}
          <Link href="mailto:hello@go-orca.tech" className="text-foreground hover:text-primary underline underline-offset-2">
            hello@go-orca.tech
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-foreground hover:text-primary underline underline-offset-2">
            open the contact form
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
