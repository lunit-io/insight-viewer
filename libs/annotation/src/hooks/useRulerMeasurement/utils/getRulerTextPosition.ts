import { Point } from '../../../types'
import { RULER_TEXT_POSITION_SPACING } from '../../../const'
import { calculateLengthBetweenPoints } from '../../../utils/calculateLengthBetweenPoints'

export function getRulerTextPosition([startPoint, endPoint]: [Point, Point]): Point {
  const length = calculateLengthBetweenPoints(startPoint, endPoint, 1, 1)

  const t = RULER_TEXT_POSITION_SPACING / length

  const positionX = (1 + t) * endPoint[0] - t * startPoint[0]
  const positionY = (1 + t) * endPoint[1] - t * startPoint[1]

  return [positionX, positionY]
}
