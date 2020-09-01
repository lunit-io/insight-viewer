export function getAlpha({
  stop,
  threshold,
}: {
  stop: number;
  threshold: number;
}): number {
  return stop < threshold ? 0 : ((stop - threshold) * 0.75) / (1 - threshold);
}
