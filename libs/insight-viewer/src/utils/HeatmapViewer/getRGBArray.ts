/**
 * A function that converts probability values
 * (0~1) of a specific area into [r, g, b] arrays corresponding to JET colormap colors
 */
export function getRGBArray(value: number): number[] {
  const v = Math.max(Math.min(value, 1), 0)
  let r, g, b

  if (v < 0.25) {
    // Between 0 and 0.25: 74,230,255 fixed
    r = 74
    g = 230
    b = 255
  } else if (v < 0.5) {
    // Between 0.25 and 0.5: linearly convert from 74,230,255 to 221,255,0
    const t = (v - 0.25) / 0.25
    r = Math.round(74 + t * (221 - 74))
    g = Math.round(230 + t * (255 - 230))
    b = Math.round(255 + t * (0 - 255))
  } else {
    // 0.5 to 1 interval: linearly convert from 221,255,0 to 255,0,92
    const t = (v - 0.5) / 0.5
    r = Math.round(221 + t * (255 - 221))
    g = Math.round(255 + t * (0 - 255))
    b = Math.round(0 + t * (92 - 0))
  }

  return [r, g, b]
}
