import type { Point } from '../types'

interface GetMovedPointsProp {
  prevPoints: Point[]
  editStartPoint: Point
  currentPoint: Point
}

export function getMovedPoints({ prevPoints, editStartPoint, currentPoint }: GetMovedPointsProp): Point[] {
  const [currentX, currentY] = currentPoint
  const [startEditX, startEditY] = editStartPoint

  const deltaX = currentX - startEditX
  const deltaY = currentY - startEditY

  const movedPoints = prevPoints.map((point) => [point[0] + deltaX, point[1] + deltaY] as Point)

  return movedPoints
}
