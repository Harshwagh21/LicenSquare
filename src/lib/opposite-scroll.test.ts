import { describe, expect, it } from "vitest";
import { oppositeTrackOffset, sectionScrollProgress } from "./opposite-scroll";

describe("oppositeTrackOffset", () => {
  it("starts on the last panel so the first story visual is in view", () => {
    expect(oppositeTrackOffset(0, 5, 800)).toBe(-3200);
  });

  it("ends on the first panel in the reversed stack", () => {
    expect(oppositeTrackOffset(1, 5, 800)).toBe(0);
  });

  it("moves downward as the page scrolls down", () => {
    const start = oppositeTrackOffset(0, 4, 500);
    const mid = oppositeTrackOffset(0.5, 4, 500);
    expect(mid).toBeGreaterThan(start);
    expect(mid).toBe(-750);
  });

  it("clamps progress outside 0 to 1", () => {
    expect(oppositeTrackOffset(-1, 3, 100)).toBe(-200);
    expect(oppositeTrackOffset(2, 3, 100)).toBe(0);
  });
});

describe("sectionScrollProgress", () => {
  it("is zero when the section top sits under the header", () => {
    expect(sectionScrollProgress(72, 72, 4000, 800)).toBe(0);
  });

  it("is one when the last panel has reached the header", () => {
    expect(sectionScrollProgress(72 - 3200, 72, 4000, 800)).toBe(1);
  });
});
