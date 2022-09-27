import { Point } from '../../types'

const calcDistance = (pointA: Point, pointB: Point) => {
  return Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2)
}

export function getConnectingLinePointsFromLine(points: [Point, Point], textPoint: Point): [Point, Point] {
  const [startPoint, endPoint] = points

  const distanceFromStartPoint = calcDistance(startPoint, textPoint)
  const distanceFromEndPoint = calcDistance(endPoint, textPoint)

  return [distanceFromStartPoint < distanceFromEndPoint ? startPoint : endPoint, textPoint]
}
