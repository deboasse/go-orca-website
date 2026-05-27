# auth.md

You are an agent. This service supports **agentic registration**: discover → register → call API → handle revocation.

Examples use `https://go-orca.tech` as both the resource server and authorization server.

## Step 1 — Discover

### 1a. Fetch the Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
```

Response:

```json
{
  "resource": "https://go-orca.tech",
  "authorization_servers": ["https://go-orca.tech"],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://go-orca.tech/.well-known/api-catalog",
  "scopes_supported": ["leads:read", "leads:write"]
}
```

### 1b. Fetch the Authorization Server metadata

```http
GET /.well-known/oauth-authorization-server
```

The response includes an `agent_auth` block with `skill`, `register_uri`, and supported scopes.

## Step 2 — Pick a method

This service supports **client_credentials** only. No anonymous or email-verification flows.

Contact [hello@go-orca.tech](mailto:hello@go-orca.tech) or submit the form at `https://go-orca.tech/contact` to request API access. You will receive a `client_id` and `client_secret`.

## Step 3 — Register / obtain a token

```http
POST /api/auth/login
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "<your_client_id>",
  "client_secret": "<your_client_secret>",
  "scope": "leads:read leads:write"
}
```

Response (200):

```json
{
  "access_token": "<token>",
  "token_type": "Bearer",
  "expires_in": 604800,
  "scope": "leads:read leads:write"
}
```

## Step 4 — Use the credential

```http
GET /api/leads
Authorization: Bearer <access_token>
```

Available scopes:

| Scope | Access |
|---|---|
| `leads:read` | Read leads from the pipeline |
| `leads:write` | Update lead status and notes |

## Step 5 — Handle revocation

Credentials expire after 7 days. On a 401, drop the token and re-run Step 3.

This service does not issue refresh tokens. Re-authenticate with client credentials when the token expires.

## Public endpoints (no auth required)

| Path | Method | Description |
|---|---|---|
| `/` | GET | Marketing homepage |
| `/contact` | GET | Contact / quote form |
| `/tools/*` | GET | Free business calculators |
| `/api/quote` | POST | Submit a quote request |

## Errors

| Code | What to do |
|---|---|
| 401 | Token expired or invalid — re-authenticate at Step 3 |
| 403 | Scope insufficient — request the required scope |
| 429 | Rate limited — back off and retry |
| 5xx | Exponential backoff, retry the same request |

## More

- [API Catalog](https://go-orca.tech/.well-known/api-catalog)
- [Agent Skills](https://go-orca.tech/.well-known/agent-skills/index.json)
- [MCP Server Card](https://go-orca.tech/.well-known/mcp/server-card.json)
