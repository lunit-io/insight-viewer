import type { Point } from '../types'

export function getCircleStartPoint(centerPoint: Point, radius: number): Point {
  const startPoint: Point = [centerPoint[0] - radius, centerPoint[1]]

  return startPoint
}
