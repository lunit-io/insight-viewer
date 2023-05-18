import { CIRCLE_TEXT_POINT_ANGLE, CIRCLE_TEXT_POSITION_SPACING } from '../../../const'
import type { Point } from '../../../types'

export function getCircleTextPosition(point: Point, radius: number): Point {
  const positionX =
    Math.sin((CIRCLE_TEXT_POINT_ANGLE * Math.PI) / 180) * radius + point[0] + CIRCLE_TEXT_POSITION_SPACING.x
  const positionY =
    -Math.cos((CIRCLE_TEXT_POINT_ANGLE * Math.PI) / 180) * radius + point[1] + CIRCLE_TEXT_POSITION_SPACING.y

  return [positionX, positionY]
}
