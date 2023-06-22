import type { Point } from '../types'

/**
 * Function to check if two points are the same in line and ruler mode
 * or check two point compare
 */
export const isSamePoints = (points: [Point, Point]) => {
  const [prevPoint, currentPoint] = points

  return prevPoint[0] === currentPoint[0] && prevPoint[1] === currentPoint[1]
}
