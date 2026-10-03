import { HeroContent } from "./hero-content";
import { LeadForm } from "./lead-form";

export function Hero() {
  return (
    <section className="brutal-grid relative flex min-h-0 flex-1 flex-col overflow-hidden border-b-2 border-foreground lg:border-b-0">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-ice/80 to-transparent dark:from-brand-navy/30" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col justify-center px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8 lg:py-4">
        <HeroContent />
        <div className="mt-8 min-h-0 lg:mt-0 lg:max-h-[calc(100dvh-11rem)] lg:overflow-y-auto">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
