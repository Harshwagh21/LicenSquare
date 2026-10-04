import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const trustItems = ["100% Secure", "Expert Guidance", "Faster Process"] as const;

export function Header() {
  return (
    <header className="relative z-20 shrink-0 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:justify-between sm:px-6 lg:px-8">
        <Logo variant="inline" size="header" priority className="shrink-0" />
        <TrustMarquee />
        <TrustList className="hidden sm:flex" />
      </div>
    </header>
  );
}

function TrustList({ className }: { className?: string }) {
  return (
    <ul className={cn("items-center gap-x-4", className)}>
      {trustItems.map((item) => (
        <li
          key={item}
          className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function TrustMarquee() {
  return (
    <div className="trust-marquee-mask min-w-0 flex-1 overflow-hidden sm:hidden">
      <div className="trust-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center py-1.5" aria-hidden={copy === 1}>
            {trustItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
              >
                {item}
                <span className="size-1 shrink-0 rounded-full bg-brand-sky" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
