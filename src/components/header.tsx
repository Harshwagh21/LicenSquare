import { Logo } from "./logo";

const trustItems = ["100% Secure", "Expert Guidance", "Faster Process"] as const;

export function Header() {
  return (
    <header className="relative z-20 shrink-0 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Logo variant="inline" size="header" priority />
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4">
          {trustItems.map((item) => (
            <li
              key={item}  
              className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
