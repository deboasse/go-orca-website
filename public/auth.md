# Authentication — go-orca.tech

## Public Access (No Auth Required)

All marketing pages, free tools, and the quote submission form are publicly accessible with no authentication.

| Path | Auth |
|---|---|
| `/` | None |
| `/about` | None |
| `/contact` | None |
| `/tools/*` | None |
| `POST /api/quote` | None |

## Agent Access

Agents may read all public pages freely. Content is available in Markdown via content negotiation (`Accept: text/markdown`) on major routes.

The quote form (`POST /api/quote`) accepts unauthenticated requests — agents may submit on behalf of users.

## Protected Resources

Administrative and CRM APIs are not intended for external agent use and require an admin session cookie. Do not attempt to access `/api/clients`, `/api/leads`, `/api/onboard`, or `/api/payments` without explicit authorization from Go-Orca.

## OAuth (Leads API)

A leads API is available for authorized integrations using OAuth 2.0.

- **Authorization server:** `https://go-orca.tech/.well-known/oauth-authorization-server`
- **Protected resource metadata:** `https://go-orca.tech/.well-known/oauth-protected-resource`
- **Scopes:** `leads:read`, `leads:write`
- **Grant types:** `authorization_code`, `client_credentials`
- **PKCE:** required (`S256`)

Contact hello@go-orca.tech to request API access.

## More

- [API Catalog](https://go-orca.tech/.well-known/api-catalog)
- [Agent Skills](https://go-orca.tech/.well-known/agent-skills/index.json)
- [MCP Server Card](https://go-orca.tech/.well-known/mcp/server-card.json)
