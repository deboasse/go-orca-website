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
`;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse(ROBOTS, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/robots.txt"],
};
