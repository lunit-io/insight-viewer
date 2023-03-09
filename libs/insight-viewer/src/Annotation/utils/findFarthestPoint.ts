import type { Point } from '../types'

function calculateDistance(point1: Point, point2: Point): number {
  const xDiff = point1[0] - point2[0]
  const yDiff = point1[1] - point2[1]

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

export function findFarthestPoint(mouseDownPoint: Point, targetPoints: [Point, Point]): Point {
  const [point1, point2] = targetPoints

  const distance1 = calculateDistance(point1, mouseDownPoint)
  const distance2 = calculateDistance(point2, mouseDownPoint)

  return distance1 > distance2 ? point1 : point2
}
