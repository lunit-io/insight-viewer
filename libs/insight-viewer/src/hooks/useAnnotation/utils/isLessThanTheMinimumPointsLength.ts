import type { Point } from '../../../types'

const MINIMUM_POINTS_LENGTH = 5

/**
 * Function to check the minimum length of points in polygon, free line mode
 */
export const isLessThanTheMinimumPointsLength = (points: Point[]) => {
  return points.length < MINIMUM_POINTS_LENGTH
}
