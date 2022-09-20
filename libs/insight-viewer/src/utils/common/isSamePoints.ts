import type { Point } from '../../types'

/**
 * Function to check if two points are the same in line and ruler mode
 */
export const isSamePoints = (points: [Point, Point]) => {
  const [startPoint, endPoint] = points

  return startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]
}
