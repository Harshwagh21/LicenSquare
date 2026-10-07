export const STORY = [
  {
    id: "hero",
    index: "01",
    eyebrow: "Medical licensing",
    title: "Licensed in any U.S. state. You stay with patients.",
    accent: "any U.S. state",
    body: "LicenSquare runs the board process for physicians and clinicians, from the first form to the approval letter.",
  },
  {
    id: "services",
    index: "02",
    eyebrow: "Services",
    title: "The licensing work we take off your desk.",
    accent: "",
    body: "New licenses, renewals, and the next state you want to practice in. One team owns the file until the board closes it.",
  },
  {
    id: "orchestration",
    index: "03",
    eyebrow: "How we orchestrate",
    title: "Four steps. One specialist. No black box.",
    accent: "",
    body: "You tell us the license, the state, and what has to happen. We map the board, assemble the file, and stay on every reply.",
  },
  {
    id: "why",
    index: "04",
    eyebrow: "Why LicenSquare",
    title: "A licensing desk that works like part of your practice.",
    accent: "",
    body: "A named specialist, a single thread, and a file that is complete before it ever reaches the board.",
  },
  {
    id: "request",
    index: "05",
    eyebrow: "Your request",
    title: "Tell us what you actually need.",
    accent: "",
    body: "State and license type point us to the right board. Your note tells us the real job: a deadline, a move, a renewal, an extra state.",
  },
] as const;

export type StoryPanel = (typeof STORY)[number];
export type StoryId = StoryPanel["id"];
