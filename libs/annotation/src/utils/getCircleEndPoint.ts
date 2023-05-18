import type { Point } from '../types'

export function getCircleEndPoint(centerPoint: Point, radius: number): Point {
  const endPoint: Point = [centerPoint[0] + radius, centerPoint[1]]
  return endPoint
}
