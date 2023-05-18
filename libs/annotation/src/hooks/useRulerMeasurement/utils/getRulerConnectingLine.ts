import type { Point } from '../../../types'

const getDistance = (pointA: Point, pointB: Point) => {
  return Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2)
}

export function getRulerConnectingLine([startPoint, endPoint]: [Point, Point], textPoint: Point): [Point, Point] {
  const distanceFromStartPoint = getDistance(startPoint, textPoint)
  const distanceFromEndPoint = getDistance(endPoint, textPoint)

  return [distanceFromStartPoint < distanceFromEndPoint ? startPoint : endPoint, textPoint]
}
