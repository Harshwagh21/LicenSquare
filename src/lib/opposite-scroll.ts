export function oppositeTrackOffset(progress: number, count: number, panelHeight: number) {
  if (count <= 1 || panelHeight <= 0) return 0;
  const t = Math.min(1, Math.max(0, progress));
  return (count - 1) * panelHeight * (t - 1);
}

export function sectionScrollProgress(
  sectionTop: number,
  headerHeight: number,
  sectionHeight: number,
  panelHeight: number,
) {
  const max = Math.max(sectionHeight - panelHeight, 1);
  const scrolled = headerHeight - sectionTop;
  return Math.min(1, Math.max(0, scrolled / max));
}
