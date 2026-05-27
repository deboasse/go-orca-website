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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
