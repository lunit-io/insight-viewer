import { Point } from '../../types'
import { RULER_TEXT_POSITION_SPACING } from '../../const'

const TOP_LOCATION_POSITION = 25

export function getRulerTextPosition(point: Point): Point {
  const positionX = point[0] + RULER_TEXT_POSITION_SPACING.x
  const positionY = point[1] + RULER_TEXT_POSITION_SPACING.y - TOP_LOCATION_POSITION

  return [positionX, positionY]
}
