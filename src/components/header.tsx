import { Badge } from "@/components/ui/badge";
import { Logo } from "./logo";

const trustItems = ["100% Secure", "Expert Guidance", "Faster Process"] as const;

export function Header() {
  return (
    <header className="relative z-20 shrink-0 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Logo variant="inline" size="header" priority showTagline />
        <ul className="flex flex-wrap items-center gap-1.5">
          {trustItems.map((item) => (
            <li key={item}>
              <Badge
                variant="outline"
                className="rounded-none border-foreground/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              >
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
