# auth.md

You are an agent. This service supports **agentic registration**: discover → register → (claim if needed) → call API → handle revocation. Follow the steps in order.

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

The `agent_auth` block contains `skill`, `register_uri`, `claim_uri`, `revocation_uri`, and `identity_types_supported`.

## Step 2 — Pick a method

Use this decision tree:

1. **You have a user identity and can mint an ID-JAG** → [identity_assertion + id-jag](#identity_assertion--id-jag)
2. **You have only the user's email** → [identity_assertion + email](#identity_assertion--email)
3. **You have neither** → [anonymous](#anonymous)

Check `agent_auth.identity_types_supported` to confirm the method is accepted before sending.

## Step 3 — Register

### anonymous

```http
POST /api/agent/auth
Content-Type: application/json

{
  "type": "anonymous",
  "requested_credential_type": "api_key"
}
```

Response (200):

```json
{
  "registration_id": "reg_...",
  "registration_type": "anonymous",
  "credential_type": "api_key",
  "credential": "sk_...",
  "credential_expires": null,
  "scopes": ["leads:read"],
  "claim_url": "https://go-orca.tech/api/agent/auth/claim",
  "claim_token": "clm_...",
  "claim_token_expires": "2026-06-01T00:00:00.000Z",
  "post_claim_scopes": ["leads:read", "leads:write"]
}
```

You have a usable credential immediately. To unlock full scopes, complete the claim ceremony (Step 4). Otherwise skip to Step 5.

### identity_assertion + id-jag

Mint an ID-JAG with `aud` = `https://go-orca.tech`, short expiry, fresh `jti`.

```http
POST /api/agent/auth
Content-Type: application/json

{
  "type": "identity_assertion",
  "assertion_type": "urn:ietf:params:oauth:token-type:id-jag",
  "assertion": "<your ID-JAG JWT>",
  "requested_credential_type": "api_key"
}
```

Response (200):

```json
{
  "registration_id": "reg_...",
  "registration_type": "agent-provider",
  "credential_type": "api_key",
  "credential": "sk_...",
  "credential_expires": null,
  "scopes": ["leads:read", "leads:write"]
}
```

Go to Step 5.

### identity_assertion + email

```http
POST /api/agent/auth
Content-Type: application/json

{
  "type": "identity_assertion",
  "assertion_type": "verified_email",
  "assertion": "user@example.com",
  "requested_credential_type": "api_key"
}
```

Response (200):

```json
{
  "registration_id": "reg_...",
  "registration_type": "email-verification",
  "claim_url": "https://go-orca.tech/api/agent/auth/claim",
  "claim_token": "clm_...",
  "claim_token_expires": "2026-06-01T00:00:00.000Z",
  "post_claim_scopes": ["leads:read", "leads:write"]
}
```

No credential yet. Go to Step 4.

## Step 4 — Claim ceremony

### 4a. Trigger claim email (anonymous only)

```http
POST /api/agent/auth/claim
Content-Type: application/json

{
  "claim_token": "clm_...",
  "email": "user@example.com"
}
```

### 4b. User reads back 6-digit OTP from email

### 4c. Submit OTP

```http
POST /api/agent/auth/claim/complete
Content-Type: application/json

{
  "claim_token": "clm_...",
  "otp": "123456"
}
```

## Step 5 — Use the credential

```http
GET /api/leads
Authorization: Bearer <credential>
```

| Scope | Access |
|---|---|
| `leads:read` | Read leads |
| `leads:write` | Update lead status and notes |

On a 401, drop the credential and restart at Step 1.

## Public endpoints (no auth required)

| Path | Method |
|---|---|
| `/` | GET |
| `/contact` | GET |
| `/tools/*` | GET |
| `/api/quote` | POST |

## Rate Limits

| Window | Limit |
|---|---|
| Per IP, per minute | 60 requests |
| Per credential, per minute | 120 requests |
| Agent auth registration, per hour | 10 registrations |

Headers returned on every response:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1717200000
```

On limit exceeded: `HTTP 429`. Back off and retry after `Retry-After` seconds.

## Revocation

You do not initiate revocation. Two paths exist:

- **Provider-driven (ID-JAG flows):** the provider that minted your ID-JAG can POST a `logout+jwt` to `https://go-orca.tech/api/agent/auth/revoke`. Your credential will be invalidated. You discover this on the next API call returning 401 — restart at Step 1.
- **API key flows:** on a 401 for a previously-working credential, drop it and restart at Step 1.

## Errors

| Code | What to do |
|---|---|
| 401 | Credential expired or invalid — restart at Step 1 |
| 403 | Scope insufficient |
| 429 | Rate limited — back off, retry after Retry-After |
| 5xx | Exponential backoff, retry |

## More

- [API Catalog](https://go-orca.tech/.well-known/api-catalog)
- [Agent Skills](https://go-orca.tech/.well-known/agent-skills/index.json)
- [MCP Server Card](https://go-orca.tech/.well-known/mcp/server-card.json)
