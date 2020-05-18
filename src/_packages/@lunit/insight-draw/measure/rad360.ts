export function rad360(atan2: number): number {
  return atan2 < 0 ? Math.PI * 2 + atan2 : atan2;
}
