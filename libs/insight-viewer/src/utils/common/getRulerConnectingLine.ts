import { Point } from '../../types'

export function getRulerConnectingLine(points: [Point, Point], textPoint: Point): [Point, Point] {
  const [startPoint, endPoint] = points
  const centerX = (startPoint[0] + endPoint[0]) / 2

  if (centerX < textPoint[0]) {
    return [endPoint, textPoint]
  }

  return [startPoint, textPoint]
}
