import { CIRCLE_EDIT_POINT_ANGLE } from '../const'
import type { Point } from '../types'

export function getCircleEditPoints(point: Point, radius: number): [Point, Point] {
  const startX = Math.sin((CIRCLE_EDIT_POINT_ANGLE.START_ANGLE * Math.PI) / 180) * radius + point[0]
  const startY = -Math.cos((CIRCLE_EDIT_POINT_ANGLE.START_ANGLE * Math.PI) / 180) * radius + point[1]
  const endX = Math.sin((CIRCLE_EDIT_POINT_ANGLE.END_ANGLE * Math.PI) / 180) * radius + point[0]
  const endY = -Math.cos((CIRCLE_EDIT_POINT_ANGLE.END_ANGLE * Math.PI) / 180) * radius + point[1]

  return [
    [startX, startY],
    [endX, endY],
  ]
}
