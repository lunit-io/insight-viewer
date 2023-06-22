/* eslint-disable no-plusplus */

import { getIsIntersection } from './getIsIntersection'
import type { Point } from '../../../types'

/**
 * Check if polygon is a complex polygon with intersection
 * @param polygon Array<[number, number]>
 */
export function getIsComplexPolygon(polygon: Point[]): boolean {
  // Adds an initial point as an endpoint to create a closed polygon
  const closedPolygon: Point[] = [...polygon, polygon[0]]
  const max = closedPolygon.length

  let i = -1
  while (++i < max - 2) {
    // Since there is no need to search before the current point i,
    // it searches from the point after i
    let n = i + 2
    while (++n < max - 1) {
      // Check if line a -> b and line c -> d intersect
      // i becomes point a and i + 1 becomes point b
      // i + 2 becomes c, i + 3 becomes d
      // i + 1 -> i + 2 is in contact with i -> i + 1 and cannot intersect, so we exclude it
      if (getIsIntersection(closedPolygon[i], closedPolygon[i + 1], closedPolygon[n], closedPolygon[n + 1])) {
        return true
      }
    }
  }

  return false
}
