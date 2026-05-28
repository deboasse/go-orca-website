import Link from "next/link";
import Image from "next/image";

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-foreground/80 hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 leading-none">
              <Image src="/orca-logo.png" alt="GO-ORCA logo" width={40} height={40} className="h-10 w-10 object-contain shrink-0" />
              <span className="font-sans text-3xl font-extrabold italic tracking-tight leading-none">
                <span className="text-foreground">GO</span>
                <span className="text-primary">-ORCA</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Custom CRM, internal tools and operational software for businesses that have outgrown spreadsheets.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              US, Boston | Brazil, São Paulo
            </p>
          </div>
          <Col
            title="Platform"
            links={[
              { href: "/platform", label: "CRM" },
              { href: "/platform", label: "Custom apps" },
              { href: "/platform", label: "Product development" },
              { href: "/platform", label: "Plugin & integrations" },
            ]}
          />
          <Col
            title="Company"
            links={[
              { href: "/solutions", label: "Solutions" },
              { href: "/tools", label: "Tools" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <Col
            title="Developers"
            links={[
              { href: "/auth.md", label: "Auth guide" },
              { href: "/openapi.json", label: "OpenAPI spec" },
              { href: "/.well-known/agent-skills/index.json", label: "Agent skills" },
              { href: "/llms.txt", label: "llms.txt" },
            ]}
          />
          <Col
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/dpa", label: "DPA" },
            ]}
          />
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <span className="font-mono">© {new Date().getFullYear()} Go-Orca.Tech, All rights reserved.</span>
          <span className="font-mono">v5.0 · Next.js · operational</span>
        </div>
      </div>
    </footer>
  );
}
