/**
 * Base /api route — returns JSON discovery info and 401 with WWW-Authenticate
 * for unauthenticated requests.
 *
 * This ensures API scanners probing /api get proper JSON error responses
 * and WWW-Authenticate headers for RFC 9728 protected resource discovery.
 */

import { NextResponse } from "next/server";

const PRM = "https://go-orca.tech/.well-known/oauth-protected-resource";
const WWW_AUTH = `Bearer resource_metadata="${PRM}"`;

const API_INDEX = {
  api: "go-orca.tech",
  version: "1.0",
  documentation: "https://go-orca.tech/developers",
  openapi: "https://go-orca.tech/openapi.json",
  auth: "https://go-orca.tech/auth.md",
  catalog: "https://go-orca.tech/.well-known/api-catalog",
  endpoints: {
    "POST /api/agent/auth": "Register agent, obtain API key (no auth required)",
    "POST /api/agent/auth/claim": "Initiate claim ceremony",
    "POST /api/agent/auth/claim/complete": "Complete claim with OTP",
    "GET /api/leads": "List CRM leads (Bearer required, scope: leads:read)",
    "PATCH /api/leads": "Update lead status/notes (Bearer required, scope: leads:write)",
    "POST /api/quote": "Submit a quote request (no auth required)",
    "GET /api/mcp": "MCP server discovery",
    "POST /api/mcp": "MCP JSON-RPC 2.0 endpoint",
  },
};

export async function GET() {
  return NextResponse.json(
    {
      error: "unauthorized",
      message: "Authentication required. Register an agent credential at /api/agent/auth. See /auth.md for the full flow.",
      ...API_INDEX,
    },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": WWW_AUTH,
      },
    }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      error: "unauthorized",
      message: "Authentication required. Register an agent credential at /api/agent/auth. See /auth.md for the full flow.",
      ...API_INDEX,
    },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": WWW_AUTH,
      },
    }
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      error: "unauthorized",
      message: "Authentication required. Register an agent credential at /api/agent/auth.",
      documentation: "https://go-orca.tech/developers",
    },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": WWW_AUTH,
      },
    }
  );
}
