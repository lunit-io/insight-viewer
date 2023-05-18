import type { Point } from '../types'

export function getCircleCenterPoint(startPoint: Point, endPoint: Point): Point {
  const centerX = (startPoint[0] + endPoint[0]) / 2
  const centerY = (startPoint[1] + endPoint[1]) / 2

  const centerPoint: Point = [centerX, centerY]

  return centerPoint
}
