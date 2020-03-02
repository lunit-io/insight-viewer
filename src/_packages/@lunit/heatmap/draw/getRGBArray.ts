export function getRGBArray(value: number): [number, number, number] {
  let r: number = 1.0;
  let g: number = 1.0;
  let b: number = 1.0;
  const v: number = Math.max(Math.min(value, 1), 0);

  if (v < 0.25) {
    r = 0;
    g = 4 * v;
  } else if (v < 0.5) {
    r = 0;
    b = 1 + 4 * (0.25 - v);
  } else if (v < 0.75) {
    r = 4 * (v - 0.5);
    b = 0;
  } else {
    g = 1 + 4 * (0.75 - v);
    b = 0;
  }

  return [(r * 255) << 0, (g * 255) << 0, (b * 255) << 0];
}
