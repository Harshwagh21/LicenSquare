import { LeadForm } from "@/components/lead-form";
import type { StoryId } from "@/lib/story";

const services = [
  ["01", "Initial license", "First full license in the state where you want to practice."],
  ["02", "Renewals", "On-time renewals so a credential does not lapse."],
  ["03", "Next state", "Expansion when your practice crosses a state line."],
  ["04", "Board follow-up", "Deficiency letters answered until the file closes."],
] as const;

const steps = [
  ["01", "Intake", "License, state, and the outcome you need."],
  ["02", "Board map", "That state's requirements, listed before you gather papers."],
  ["03", "File and submit", "A complete packet, sent to the board."],
  ["04", "Close the loop", "Questions and deficiencies tracked through approval."],
] as const;

const reasons = [
  ["01", "Specialists", "People who work state medical boards, not a generic inbox."],
  ["02", "Complete files", "We assemble what the board asks for before anything is filed."],
  ["03", "One thread", "A single contact from the first note to the approval letter."],
  ["04", "Quiet handling", "Your details stay in the case file."],
] as const;

const desk = [
  ["Coverage", "Every U.S. state"],
  ["First reply", "One business day"],
  ["Your side", "A named specialist"],
  ["The work", "File through approval"],
] as const;

export function StoryVisual({ id }: { id: StoryId }) {
  return <div className="w-full">{visualFor(id)}</div>;
}

function visualFor(id: StoryId) {
  if (id === "hero") return <DeskCard />;
  if (id === "services") return <IndexGrid items={services} />;
  if (id === "orchestration") return <StepList items={steps} />;
  if (id === "why") return <IndexGrid items={reasons} />;
  return <LeadForm />;
}

function DeskCard() {
  return (
    <div className="brutal-frame border border-border bg-card">
      <p className="border-b border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-sky">
        Licensing desk
      </p>
      <dl className="divide-y divide-border">
        {desk.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="text-right font-heading text-sm font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function IndexGrid({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-border bg-border">
      {items.map(([index, title, detail]) => (
        <article key={index} className="bg-card p-3.5">
          <p className="font-heading text-[11px] font-bold tabular-nums text-brand-sky">{index}</p>
          <h3 className="font-heading mt-2 text-sm font-bold">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
        </article>
      ))}
    </div>
  );
}

function StepList({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <ol className="brutal-frame border border-border bg-card">
      {items.map(([index, title, detail]) => (
        <li key={index} className="flex gap-3 border-b border-border px-4 py-3.5 last:border-b-0">
          <span className="font-heading text-sm font-bold tabular-nums text-brand-sky">{index}</span>
          <span>
            <span className="block font-heading text-sm font-bold">{title}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
