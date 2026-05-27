"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const nav = [
  { href: "/platform", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:h-24 md:px-6">
        <Link href="/" className="flex items-center gap-2 leading-none" onClick={() => setOpen(false)}>
          <Image src="/orca-logo.png" alt="GO-ORCA logo" width={48} height={48} className="h-10 w-10 md:h-12 md:w-12 object-contain shrink-0" />
          <span className="font-sans text-2xl font-extrabold italic tracking-tight leading-none md:text-3xl">
            <span className="text-foreground">GO</span>
            <span className="text-primary">-ORCA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact" className="btn-base btn-primary btn-sm shadow-glow">
            Get a quote
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface md:hidden"
        >
          <span className={`absolute block h-px w-4 bg-foreground transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute block h-px w-4 bg-foreground transition-transform duration-200 ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-3 text-base font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                <span>{n.label}</span>
                <span aria-hidden className="text-muted-foreground">→</span>
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-base btn-primary mt-2 w-full">
              Get a quote <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
