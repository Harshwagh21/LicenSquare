import { OppositeTrack } from "@/components/opposite-track";
import { StoryVisual } from "@/components/story-visual";
import { cn } from "@/lib/utils";
import { STORY, type StoryPanel } from "@/lib/story";
import { ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";

const copyPad =
  "px-4 py-12 sm:px-6 lg:py-10 lg:pr-10 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]";
const visualPad =
  "border-b border-border px-4 py-10 sm:px-6 lg:border-b-0 lg:px-10 lg:py-6 lg:pr-[max(1.5rem,calc((100vw-72rem)/2))]";

export function OppositeStory() {
  const visuals = [...STORY].map((panel, index) => ({ panel, index })).reverse();

  return (
    <section className="story-flow bg-background">
      <div className="story-copies">
        {STORY.map((panel, index) => (
          <StoryCopy key={panel.id} panel={panel} index={index} />
        ))}
      </div>
      <div className="story-shell">
        <div className="story-window">
          <OppositeTrack>
            {visuals.map(({ panel, index }) => (
              <div
                key={panel.id}
                className={cn("story-item story-visual overflow-y-auto", visualPad, toneClass(index))}
                style={orderStyle(index * 2 + 1)}
              >
                <StoryVisual id={panel.id} />
              </div>
            ))}
          </OppositeTrack>
        </div>
      </div>
    </section>
  );
}

function StoryCopy({ panel, index }: { panel: StoryPanel; index: number }) {
  return (
    <article
      id={panel.id}
      className={cn("story-item story-copy flex flex-col justify-between border-b border-border lg:border-b-0", copyPad, toneClass(index))}
      style={orderStyle(index * 2)}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-sky">
          {panel.index} — {panel.eyebrow}
        </p>
        <PanelHeading panel={panel} />
      </div>
      <div className="mt-8 max-w-md lg:mt-0">
        <p className="text-sm leading-relaxed text-muted-foreground lg:text-[15px]">{panel.body}</p>
        {panel.id === "hero" && (
          <p className="mt-4 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:flex">
            <ArrowDown className="size-3" aria-hidden />
            Scroll
          </p>
        )}
      </div>
    </article>
  );
}

function PanelHeading({ panel }: { panel: StoryPanel }) {
  const className =
    "font-heading mt-3 max-w-xl text-3xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-4xl xl:text-[2.75rem]";
  if (panel.id === "hero") {
    return (
      <h1 className={className}>
        <PanelTitle title={panel.title} accent={panel.accent} />
      </h1>
    );
  }
  return (
    <h2 className={className}>
      <PanelTitle title={panel.title} accent={panel.accent} />
    </h2>
  );
}

function PanelTitle({ title, accent }: { title: string; accent: string }) {
  if (!accent || !title.includes(accent)) return title;
  const [before, after] = title.split(accent);
  return (
    <>
      {before}
      <span className="text-brand-sky">{accent}</span>
      {after}
    </>
  );
}

function toneClass(index: number) {
  return index % 2 === 0 ? "brutal-grid bg-background" : "bg-card";
}

function orderStyle(order: number) {
  return { "--order": String(order) } as CSSProperties;
}
