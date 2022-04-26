import { CIRCLE_TEXT_POINT_ANGLE } from '../../const'
import { Point } from '../../types'

export function getCircleTextPosition(point: Point, radius: number): [number, number] {
  const positionX = Math.sin((CIRCLE_TEXT_POINT_ANGLE * Math.PI) / 180) * radius + point[0]
  const positionY = -Math.cos((CIRCLE_TEXT_POINT_ANGLE * Math.PI) / 180) * radius + point[1]

  return [positionX, positionY]
}
