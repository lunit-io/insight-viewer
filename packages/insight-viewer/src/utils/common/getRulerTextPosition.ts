import { Point } from '../../types'
import { RULER_TEXT_POSITION_SPACING } from '../../const'

export function getRulerTextPosition(point: Point): Point {
  const positionX = point[0] + RULER_TEXT_POSITION_SPACING.x
  const positionY = point[1] + RULER_TEXT_POSITION_SPACING.y

  return [positionX, positionY]
}
