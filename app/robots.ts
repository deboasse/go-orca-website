import type { MetadataRoute } from "next";

// Full AI-crawler rules live here as a fallback.
// In production, middleware.ts intercepts /robots.txt first and injects
// the Content-Signal directive (contentsignals.org) which this API doesn't support.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: "https://go-orca.tech/sitemap.xml",
  };
}
