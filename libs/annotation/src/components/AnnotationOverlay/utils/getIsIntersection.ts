import type { Point } from '../../../types'

/**
 * Determine if ab and cd intersect
 * @param a line 1 start
 * @param b line 1 end
 * @param c line 2 start
 * @param d line 2 end
 */
export function getIsIntersection(a: Point, b: Point, c: Point, d: Point): boolean {
  if (
    Math.max(a[0], b[0]) <= Math.min(c[0], d[0]) ||
    Math.min(a[0], b[0]) >= Math.max(c[0], d[0]) ||
    Math.max(a[1], b[1]) <= Math.min(c[1], d[1]) ||
    Math.min(a[1], b[1]) >= Math.max(c[1], d[1])
  ) {
    return false
  }

  const sign1 = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])
  const sign2 = (b[0] - a[0]) * (d[1] - a[1]) - (d[0] - a[0]) * (b[1] - a[1])
  const sign3 = (d[0] - c[0]) * (a[1] - c[1]) - (a[0] - c[0]) * (d[1] - c[1])
  const sign4 = (d[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (d[1] - c[1])

  if (sign1 === 0 && sign2 === 0 && sign3 === 0 && sign4 === 0) return true
  return sign1 * sign2 < 0 && sign3 * sign4 < 0
}
