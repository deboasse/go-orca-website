import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Go-Orca builds custom CRMs and tailored software for ambitious teams. Learn who we are and how we work.",
  openGraph: { title: "About Us — Go-Orca", description: "A small studio building custom CRMs and tailored software for ambitious teams." },
};

const testimonials = [
  {
    q: "We've been working with these folks for almost four years now. They handle a lot of our technical marketing operations, have helped us tremendously, and honestly — we don't see that changing anytime soon.",
    who: "De'Angele Group",
    tag: "Technical Marketing",
  },
  {
    q: "Natalia and Vinny are helping us build our custom fence wholesale website and the martech tools we rely on daily.",
    who: "Premier Fence Wholesale",
    tag: "Product Dev & Ops",
  },
  {
    q: "We've used Vinny's team across multiple projects and we're already looking to continue working with them going forward.",
    who: "Private Capital Company",
    tag: "Finance · NDA",
  },
  {
    q: "Inventory, clients, and sales — finally in one place. The app feels custom because it is.",
    who: "Bux Diamantaire",
    tag: "Custom App",
  },
  {
    q: "We've been using Go-Orca for over eight months now and are already expanding the partnership into the SEO and GEO work they provide.",
    who: "Private Healthcare Agency",
    tag: "Healthcare · NDA",
  },
];

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">About</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        We build software that fits the way you actually work.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Go-Orca is a team that designs and ships custom CRMs, internal tools, and client-facing apps. We partner with
        founders and operators who have outgrown spreadsheets and off-the-shelf tools, and need software shaped around
        their process, not the other way around.
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {[
          { t: "What we do", b: "Custom CRMs, dashboards, automations, client portals, and bespoke web apps, designed, built, and maintained end to end." },
          { t: "How we work", b: "Short discovery, a clear scope and price, weekly demos, and a working version in your hands fast. No agency theatre." },
          { t: "Who we work with", b: "Operators, founders, and lean teams who need real tooling, usually 5 to 1000 people, across services, real estate, e-commerce, and B2B." },
          { t: "Our promise", b: "You own the code, the data, and the roadmap. We move quickly, communicate clearly, and stay long-term partners, not vendors." },
        ].map(({ t, b }) => (
          <section key={t}>
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground">{t}</h2>
            <p className="mt-3 text-muted-foreground">{b}</p>
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/contact" className="btn-base btn-primary">Start a project →</Link>
        <Link href="/faq" className="btn-base btn-secondary">Read FAQ</Link>
      </div>

      <section className="mt-24 border-t border-border pt-16">
        <p className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">Client feedback</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Trusted by fast-paced multinational operations —{" "}
          <span className="text-muted-foreground font-normal">US, France, Hong Kong.</span>
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Some names are kept private at their request.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.who} className="flex flex-col justify-between rounded-lg border border-border bg-surface/40 p-6">
              <blockquote className="text-foreground leading-relaxed">&ldquo;{t.q}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.who}</span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">{t.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
