import { FooterBrand } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer className="relative z-10 shrink-0 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <FooterBrand />
        <ThemeToggle />
      </div>
    </footer>
  );
}
