/* eslint-disable no-bitwise */

/**
 * A function that converts probability values
 * (0~1) of a specific area into [r, g, b] arrays corresponding to JET colormap colors
 */
export function getRGBArray(value: number): number[] {
  let r = 1.0
  let g = 1.0
  let b = 1.0
  const v = Math.max(Math.min(value, 1), 0)
  if (v < 0.25) {
    r = 0
    g = 4 * v
  } else if (v < 0.5) {
    r = 0
    b = 1 + 4 * (0.25 - v)
  } else if (v < 0.75) {
    r = 4 * (v - 0.5)
    b = 0
  } else {
    g = 1 + 4 * (0.75 - v)
    b = 0
  }
  return [(r * 255) << 0, (g * 255) << 0, (b * 255) << 0]
}
