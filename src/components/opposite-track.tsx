"use client";

import { oppositeTrackOffset, sectionScrollProgress } from "@/lib/opposite-scroll";
import { STORY } from "@/lib/story";
import { useEffect, useRef, useState, type ReactNode } from "react";

const initialShift = `translate3d(0, calc(-${STORY.length - 1} * (100dvh - var(--site-header))), 0)`;

export function OppositeTrack({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(initialShift);

  useEffect(() => {
    const track = trackRef.current;
    const section = track?.closest<HTMLElement>(".story-flow");
    const frame = track?.closest<HTMLElement>(".story-window");
    if (!track || !section || !frame) return;
    return watchStoryScroll(section, frame, setTransform);
  }, []);

  return (
    <div ref={trackRef} className="opposite-track" style={{ transform }}>
      {children}
    </div>
  );
}

function watchStoryScroll(
  section: HTMLElement,
  frame: HTMLElement,
  onShift: (value: string) => void,
) {
  let frameId = 0;
  const update = () => {
    const panelHeight = frame.getBoundingClientRect().height;
    if (panelHeight < 10) return;
    const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const progress = sectionScrollProgress(
      section.getBoundingClientRect().top,
      header,
      section.offsetHeight,
      panelHeight,
    );
    const offset = oppositeTrackOffset(progress, STORY.length, panelHeight);
    onShift(`translate3d(0, ${offset}px, 0)`);
  };
  const onScroll = () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(update);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
