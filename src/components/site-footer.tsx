"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { FOOTER_LINKS, TRUST_POINTS } from "@/lib/nav";
import { ArrowUp } from "lucide-react";
import { Logo } from "./logo";

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground";

export function SiteFooter() {
  return (
    <footer className="site-footer relative z-10 flex min-h-[calc(100dvh-var(--site-header))] flex-col border-t border-border bg-background">
      <Wordmark />
      <FooterGrid />
      <LinkRow />
      <LegalBar year={new Date().getFullYear()} />
    </footer>
  );
}

function Wordmark() {
  return (
    <div className="wordmark-band flex w-full max-w-6xl flex-1 flex-col justify-end px-3 pb-2 sm:px-5 sm:pb-4">
      <p className="footer-wordmark font-heading font-extrabold">
        <span className="text-foreground">Licen</span>
        <span className="text-brand-sky">Square</span>
      </p>
    </div>
  );
}

function FooterGrid() {
  return (
    <div className="grid border-t border-border lg:grid-cols-2"> 
      <StartPanel />
      <InfoColumns />
    </div>
  );
}

function StartPanel() {
  return (
    <section className="flex flex-col items-start justify-start gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10"> 
      <p className={labelClass}>Start a file</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        Tell us the license, the state, and what has to happen. We reply within one business day.
      </p>
      <a href="#request" className={startClass}>
        Get started
      </a>
    </section>
  );
}

function InfoColumns() {
  return (
    <div className="grid border-t border-border sm:grid-cols-2 lg:border-t-0 lg:border-l">
      <ExploreList />
      <DeskList />
    </div>
  );
}

function ExploreList() {
  return (
    <nav aria-label="Footer" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <p className={labelClass}>Explore</p>
      <ul className="mt-4">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={stackLinkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DeskList() {
  return (
    <section className="border-t border-border px-4 py-8 sm:border-t-0 sm:border-l sm:px-6 lg:px-8 lg:py-10">
      <p className={labelClass}>The desk</p>
      <ul className="mt-4 space-y-2">
        {TRUST_POINTS.map((point) => (
          <li key={point} className="text-sm text-muted-foreground">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LinkRow() {
  return (
    <div className="flex flex-col gap-4 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex items-center justify-end gap-3">
        <ScrollTop />
        <ThemeToggle />
      </div>
    </div>
  );
}

function LegalBar({ year }: { year: number }) {
  return (
    <div className="flex flex-col gap-2 border-t border-border px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <Logo variant="mark" size="footer" className="hidden size-8 sm:flex" />
      <p>© {year} LicenSquare. All rights reserved.</p>
      <p>Medical licensing desk</p>
    </div>
  );
}

function ScrollTop() {
  return (
    <button type="button" onClick={scrollToTop} className={rowLinkClass}>
      <ArrowUp className="size-3.5" aria-hidden />
      Back to top
    </button>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const startClass =
  "inline-flex w-fit border border-foreground bg-primary px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/80";

const stackLinkClass =
  "block py-0.5 font-heading text-[1.65rem] font-extrabold uppercase leading-[0.95] tracking-tight text-foreground hover:text-brand-sky sm:text-3xl";

const rowLinkClass =
  "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground hover:text-brand-sky";
