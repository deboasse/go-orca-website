import type { MetadataRoute } from "next";

const BASE = "https://go-orca.tech";

const staticPages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/platform", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/dpa", priority: 0.3, changeFrequency: "yearly" as const },
];

const toolPages = [
  { path: "/tools", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/tools/crm-roi-calculator", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/tools/cac-calculator", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/tools/crm-cost-estimator", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/tools/app-development-cost", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/tools/go-orca-vs-hubspot", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/tools/go-orca-vs-salesforce", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/tools/custom-vs-off-the-shelf", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/tools/spreadsheet-vs-crm", priority: 0.85, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [...staticPages, ...toolPages].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
