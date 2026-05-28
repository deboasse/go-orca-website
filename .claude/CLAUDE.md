# Go-Orca Website — Agent Instructions

## What this repo is

Marketing website for Go-Orca.Tech — a custom CRM and software development agency based in Massachusetts, USA. Built with Next.js App Router, deployed on Vercel.

**Live site:** https://go-orca.tech
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Neon (Postgres), Resend

## Key directories

- `app/` — Next.js App Router pages and API routes
- `public/` — Static files including agent discovery files
- `components/` — Shared UI components
- `middleware.ts` — robots.txt, ?mode=agent markdown, Accept: text/markdown negotiation

## Agent discovery files (do not delete)

- `public/llms.txt` — Standard llms.txt for LLM context
- `public/llms-full.txt` — Full content dump with code examples
- `public/auth.md` — Agent auth registration guide
- `public/openapi.json` — OpenAPI 3.1 spec
- `public/.well-known/agent-card.json` — A2A agent card
- `public/.well-known/agent-skills/index.json` — Agent skills index (v0.2.0)
- `public/.well-known/mcp/server-card.json` — MCP server card
- `public/.well-known/api-catalog` — RFC 9727 API catalog
- `public/.well-known/oauth-authorization-server` — OAuth AS metadata (RFC 8414)
- `public/.well-known/oauth-protected-resource` — OAuth PR metadata (RFC 9728)
- `SKILL.md` — skills.sh skill definition

## API routes

- `app/api/mcp/route.ts` — MCP JSON-RPC 2.0 endpoint (calculate_crm_roi, estimate_crm_cost, get_quote_url)
- `app/api/leads/route.ts` — CRM leads (GET/PATCH, Bearer auth required)
- `app/api/quote/route.ts` — Quote submission (POST, public)
- `app/api/agent/auth/route.ts` — Agent credential registration
- `app/api/route.ts` — Base /api discovery + JSON 401

## Environment variables (never hardcode)

- `ADMIN_SESSION_TOKEN` — protects /api/leads
- `GO_ORCA_DB_DATABASE_URL` or `DATABASE_URL` — Neon Postgres
- `RESEND_API_KEY` — email via Resend
- `RESEND_FROM_EMAIL` — sender address

## Rules

- All secrets via `process.env.*` — never hardcoded
- Website changes commit from this repo root (branch: main)
- Dashboard/CRM is a separate repo at github.com/deboasse/go-orca-dashboard
- Do not cross-commit between repos
