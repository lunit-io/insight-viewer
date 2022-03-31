import { Point } from '../../types'

interface GetMoveRulerPointsProp {
  prevPoints: Point[]
  editStartPoint: Point
  currentPoint: Point
}

export function getMoveRulerPoints({
  prevPoints,
  editStartPoint,
  currentPoint,
}: GetMoveRulerPointsProp): [Point, Point] {
  const [currentX, currentY] = currentPoint
  const [startEditX, startEditY] = editStartPoint

  const [prevStartX, prevStartY] = prevPoints[0]
  const [prevEndX, prevEndY] = prevPoints[1]

  const xLength = startEditX - currentX
  const yLength = startEditY - currentY

  const startPoint: Point = [prevStartX - xLength, prevStartY - yLength]
  const endPoint: Point = [prevEndX - xLength, prevEndY - yLength]

  return [startPoint, endPoint]
}
