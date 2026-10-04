export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#orchestration", label: "Process" },
  { href: "#why", label: "Why us" },
] as const;

export const START_LINK = { href: "#request", label: "Get started" } as const;

export const FOOTER_LINKS = [...NAV_LINKS, START_LINK] as const;

export const TRUST_POINTS = ["100% secure", "Expert guidance", "Faster process"] as const;
