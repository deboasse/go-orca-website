import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Go-Orca.Tech — Custom CRM for Any Business, in One Dashboard",
  description:
    "We build custom CRMs, custom apps, product development, and custom plugins & integrations for any type of business. Organize your operation the way you want, stop losing information, and put everything in one single dashboard.",
};

const capabilities = [
  {
    n: "01", tag: "Core", title: "Custom CRM",
    body: "A CRM shaped to your business, your pipeline, your fields, one dashboard. Not a forced template.",
    points: ["Tailored to your workflow", "Unified contacts & inbox", "Live reports & automations"],
  },
  {
    n: "02", tag: "Build", title: "Custom Apps",
    body: "Web and mobile apps built around how you actually work, internal tools, client portals, dashboards.",
    points: ["Web & mobile apps", "Internal tools & portals", "Auth, billing, file storage"],
  },
  {
    n: "03", tag: "Ship", title: "Product Development",
    body: "From idea to launch, discovery, design, engineering and iteration to ship a real product users love.",
    points: ["Discovery & UX design", "Full-stack engineering", "MVP build & iteration"],
  },
  {
    n: "04", tag: "Extend", title: "Plugins & Integrations",
    body: "Bespoke plugins and integrations that connect everything you already use, so nothing slips between tools.",
    points: ["WordPress, Shopify, Chrome", "CRM & ERP integrations", "Webhooks & automations"],
  },
];

const steps = [
  { n: "01", t: "Listen", d: "We learn how your business actually runs, your customers, your stages, your headaches. No assumptions." },
  { n: "02", t: "Design", d: "We model your CRM around your workflow: fields, pipelines, dashboards. You approve before we build." },
  { n: "03", t: "Build", d: "Two-week sprints, demoed live. Your team starts using a real CRM in weeks, not quarters." },
  { n: "04", t: "Grow", d: "We stay on as your partner, adding modules, automations and new dashboards as your business evolves." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg radial-fade opacity-40" />
        <div className="absolute left-1/2 top-1/3 -z-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pb-40 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="rise-in mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />A custom CRM for any business
            </div>
            <h1 className="rise-in delay-100 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]">
              Your entire business, <br className="hidden md:block" />
              in{" "}
              <span className="relative inline-block">
                one
                <span aria-hidden className="underline-grow absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/80" />
              </span>{" "}
              dashboard.
            </h1>
            <p className="rise-in delay-300 mx-auto mt-7 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
              We build custom CRMs, custom apps, product development, and custom plugins &amp; integrations for any type
              of business. Organize the way <em>you</em> want, stop losing information, and run every part of your
              operation from one single place.
            </p>
            <div className="rise-in delay-400 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="group btn-base btn-primary w-full sm:w-56">
                Get a quote
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/platform" className="btn-base btn-secondary w-full sm:w-56">
                See our services
              </Link>
            </div>
            <p className="rise-in delay-500 mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              No commitment · Live walkthrough · NDA on request
            </p>
          </div>

          <div className="rise-in delay-700 relative mx-auto mt-20 max-w-6xl">
            <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[32px] bg-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">app.yourcompany.com/crm</span>
              </div>
              <Image
                src="/hero-dashboard.png"
                alt="Custom CRM dashboard with pipeline, tables and analytics"
                width={1920}
                height={1080}
                className="block w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Trusted by operators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {["De'Angele Group", "Premier Fence Wholesale", "Bux Diamantaire", "Private Capital Co.", "Healthcare Digital Agency"].map((l) => (
              <span key={l} className="font-mono text-sm tracking-wider text-foreground/40 transition-colors hover:text-foreground/80">
                {l.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <Section
        eyebrow="What we do"
        title={<>Four services. <span className="accent-gradient">One team.</span></>}
        description="Custom CRM, custom apps, product development, and custom plugins & integrations, every engagement shaped to how your business actually runs."
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {capabilities.map((c) => (
            <article key={c.n} className="group relative bg-background p-8 transition-colors hover:bg-surface md:p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted-foreground">{c.n}</span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors group-hover:border-primary/50">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{c.title}</h3>
              <p className="mt-3 max-w-md text-muted-foreground">{c.body}</p>
              <ul className="mt-6 space-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 font-mono text-xs text-foreground/70">
                    <span className="h-px w-4 bg-primary transition-all group-hover:w-6" /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/platform" className="btn-base btn-secondary">See all services →</Link>
        </div>
      </Section>

      {/* Product showcase */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">Everything in one place</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              One dashboard. Every customer, every deal, every{" "}
              <em className="font-display italic text-primary not-italic">detail</em>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              No more juggling spreadsheets, inboxes and five different SaaS tools. Your whole operation lives in one
              clean, fast dashboard, organized exactly the way you want.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {[["1", "single dashboard"], ["0", "lost information"], ["100%", "shaped to you"], ["6 weeks", "to first deploy"]].map(([n, l]) => (
                <div key={l} className="border-l border-border pl-4">
                  <dt className="text-2xl font-semibold text-foreground">{n}</dt>
                  <dd className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />
            <Image
              src="/mobile-app.jpg"
              alt="Customer-facing mobile app preview"
              width={1200}
              height={1400}
              loading="lazy"
              className="mx-auto w-full max-w-md rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <Section
        eyebrow="How it works"
        title={<>From scattered info to <span className="accent-gradient">one dashboard</span> in weeks.</>}
        description="A focused, senior team, design, engineering and ops, embedded with you for the whole engagement."
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8">
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Case study / content density section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px speakable">
              Why custom software beats off-the-shelf
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl speakable">
              Built around how your business actually works — not the other way around.
            </h2>
            <div className="mt-8 grid gap-8 text-muted-foreground leading-relaxed sm:grid-cols-2">
              <div className="space-y-4">
                <p>
                  Most CRM and business software tools are built for a fictional average company. They assume you run a
                  standard sales pipeline, that your team structure fits their user model, and that their reporting covers
                  what you actually need to see. They almost never do.
                </p>
                <p>
                  Go-Orca builds software that starts with your specific workflow. We map your pipeline stages, your
                  customer lifecycle, your team hierarchy, and your reporting needs before writing a line of code. The
                  result is a system that feels obvious to your team on day one, because it was designed around how they
                  already think and work.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  The economics shift faster than most operators expect. A 10-person team paying $600/month for HubSpot
                  or $900/month for Salesforce — tools they&apos;re using at 30% of their capability — is spending $7,200–
                  $10,800 per year on software debt. A custom CRM built for that team costs roughly $20,000–$40,000 once
                  and is paid off within two to four years, after which they own it outright with no seat fees, no
                  surprise tier upgrades, and no feature held hostage behind a higher plan.
                </p>
                <p>
                  Our clients typically see 12–20 hours per week recovered from manual data entry and context-switching
                  within the first 90 days. For a 10-person team at an average loaded cost of $75/hour, that&apos;s $46,000–
                  $78,000 in recovered capacity per year.{" "}
                  <Link href="/tools/crm-roi-calculator" className="text-foreground underline underline-offset-2 hover:text-primary">
                    Calculate your own ROI →
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-10 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
              {[
                { stat: "4+ years", label: "Longest client partnership", sub: "De'Angele Group — technical marketing operations" },
                { stat: "6 weeks", label: "Average time to first deploy", sub: "From scoping call to working CRM in your hands" },
                { stat: "$0", label: "Per-seat licensing after handoff", sub: "You own the code, the data, and the domain" },
              ].map(({ stat, label, sub }) => (
                <div key={label} className="border-l border-border pl-5">
                  <div className="text-3xl font-semibold text-foreground">{stat}</div>
                  <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border-x border-border md:grid-cols-3">
          {[
            { n: "One", l: "Custom built dashboard for your entire operation" },
            { n: "Less", l: "Customer information lost or forgotten" },
            { n: "Multiple", l: "Ways to organize your business" },
          ].map((m) => (
            <div key={m.l} className="group bg-background p-10 transition-colors hover:bg-surface md:p-14">
              <div className="text-5xl font-semibold tracking-tight text-primary transition-transform duration-500 group-hover:scale-[1.04] md:text-6xl">
                {m.n}
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder quote */}
      <Section className="!py-24">
        <figure className="mx-auto max-w-4xl text-center">
          <span className="font-display text-7xl leading-none text-primary">&ldquo;</span>
          <blockquote className="-mt-6 text-balance text-2xl font-medium leading-snug text-foreground md:text-3xl">
            Most of our clients are running their businesses themselves — they&apos;re not IT specialists. All the
            big-name tools are built from the point of view of people who understand technology. We decided to build
            our tools from the point of view of people who don&apos;t — but still need them to work perfectly for them.
          </blockquote>
          <figcaption className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Vinny Deboasse · Founder, Go-Orca.Tech
          </figcaption>
        </figure>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 grid-bg radial-fade opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Let&apos;s build yours</p>
          <h2 className="mt-5 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Stop losing information. <br className="hidden md:block" />
            <span className="accent-gradient">Start running it your way.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Tell us how your business runs today. We&apos;ll show you the CRM we&apos;d build for you, organized your way, in one
            dashboard, in a single 20-minute call.
          </p>
          <Link href="/contact" className="btn-base btn-primary mt-10 ring-glow">
            Get a quote →
          </Link>
        </div>
      </section>
    </>
  );
}
