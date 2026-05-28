import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WebMCPProvider } from "@/components/WebMCPProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://go-orca.tech"),
  title: {
    default: "Go-Orca | Custom CRM, Product Development, WordPress Plugins",
    template: "%s | Go-Orca.Tech",
  },
  description:
    "We build custom CRMs, custom apps, product development, and custom plugins & integrations for any type of business. Organize your operation the way you want, stop losing information, and put everything in one single dashboard.",
  authors: [{ name: "Go-Orca.Tech" }],
  alternates: {
    canonical: "https://go-orca.tech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/orca-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/orca-logo.png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Go-Orca.Tech",
    title: "Go-Orca | Custom CRM, Product Development, WordPress Plugins",
    description:
      "We build custom CRM for any type of business. Organize your operation the way you want, stop losing information, and put everything in one single dashboard.",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bb5f964a-7b1f-4e04-8db2-0d50fe73a5cc",
        width: 1200,
        height: 630,
        alt: "Go-Orca.Tech — Custom CRM & Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go-Orca | Custom CRM, Product Development, WordPress Plugins",
    description:
      "We build custom CRM for any type of business. Organize your operation the way you want, stop losing information, and put everything in one single dashboard.",
    images: [
      "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bb5f964a-7b1f-4e04-8db2-0d50fe73a5cc",
    ],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://go-orca.tech/#organization",
    name: "Go-Orca.Tech",
    url: "https://go-orca.tech",
    logo: "https://go-orca.tech/orca-logo.png",
    email: "hello@go-orca.tech",
    areaServed: ["US", "FR", "HK"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q139963239",
      "https://github.com/deboasse",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boston",
      addressRegion: "MA",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@go-orca.tech",
      availableLanguage: ["English", "Portuguese"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://go-orca.tech/#software",
    name: "Go-Orca CRM",
    applicationCategory: "BusinessApplication",
    description:
      "Custom CRM and business software platform. Purpose-built CRMs, internal dashboards, client portals, and web applications for growing businesses.",
    url: "https://go-orca.tech",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: "Fixed-price custom software projects. Contact for a quote.",
    },
    provider: { "@id": "https://go-orca.tech/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://go-orca.tech/#website",
    url: "https://go-orca.tech",
    name: "Go-Orca.Tech",
    publisher: { "@id": "https://go-orca.tech/#organization" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          <WebMCPProvider />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
