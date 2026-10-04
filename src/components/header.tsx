"use client";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, START_LINK } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const linkClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-brand-sky";

export function Header() {
  return (
    <header className="sticky top-0 z-30 h-(--site-header) shrink-0 border-b border-border bg-background">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="shrink-0" aria-label="LicenSquare home">
          <Logo variant="inline" size="header" priority />
        </a>  
        <DesktopNav />
        <MobileMenu />
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </a>
      ))}
      <a href={START_LINK.href} className={startClass}>
        {START_LINK.label}
      </a>
    </nav>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <MenuButton open={open} onClick={() => setOpen((value) => !value)} />
      {open && <MobilePanel onNavigate={close} />}
    </div>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const Icon = open ? X : Menu;
  return (
    <button
      type="button"
      className="inline-flex size-9 items-center justify-center bg-background text-foreground"
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
}

function MobilePanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav
      id="site-menu"
      aria-label="Primary"
      className="absolute inset-x-0 top-full z-40 border-b border-border bg-background"
    >
      <div className="mx-auto flex max-w-6xl flex-col px-4">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="border-b border-border py-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground hover:text-brand-sky"
          >
            {link.label}
          </a>
        ))}
        <a
          href={START_LINK.href}
          onClick={onNavigate}
          className={cn(startClass, "my-4 flex justify-center py-3")}
        >
          {START_LINK.label}
        </a>
        <div className="flex items-center justify-between border-t border-border py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Appearance
          </p>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

const startClass =
  "border border-foreground bg-primary px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/80";
