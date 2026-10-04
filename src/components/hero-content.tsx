const benefits = [
  {
    index: "01",
    title: "End-to-End Support",
    description: "Application through approval, handled in one workflow.",
  },
  {
    index: "02",
    title: "Save Time",
    description: "Fewer delays with structured documents and state tracking.",
  },
  {
    index: "03",
    title: "Expert Guidance",
    description: "Dedicated licensing specialists on every case.",
  },
] as const;

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-sky">
        Medical licensing · Every U.S. state.
      </p>
      <h1 className="font-heading mt-2 text-2xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-3xl lg:text-[2.125rem] xl:text-4xl">
        We help doctors get licensed in{" "}
        <span className="text-brand-sky decoration-2 underline-offset-4">
          any U.S. state
        </span>
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground lg:text-[13px] lg:leading-snug">
        LicenSquare removes friction from state medical boards so you can stay
        focused on patient care, not paperwork loops.
      </p>

      <div className="mt-5 hidden gap-px border border-border bg-border sm:mt-5 sm:grid sm:grid-cols-3 lg:mt-6">
        {benefits.map((item) => (
          <article key={item.index} className="bg-background p-3 lg:p-3.5">
            <p className="font-heading text-[11px] font-bold tabular-nums text-brand-sky">
              {item.index}
            </p>
            <h2 className="font-heading mt-1.5 text-sm font-bold text-foreground">
              {item.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
