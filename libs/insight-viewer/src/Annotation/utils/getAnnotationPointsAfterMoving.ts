import { getMovedPoints } from '../../utils/common/getMovedPoints'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import { getCircleStartPoint } from '../../hooks/useMeasurementPointsHandler/utils/getCircleStartPoint'

import type { Point } from '../types'

export function getAreaAnnotationMovedPoints(prevPoints: Point[], movePoint: Point, currentPoint: Point) {
  const movedPoints = getMovedPoints({ prevPoints, editStartPoint: movePoint, currentPoint }) as [Point, Point]
  const [centerPoint, endPoint] = movedPoints
  const radius = getCircleRadiusByCenter(centerPoint, endPoint)

  const startPoint = getCircleStartPoint(centerPoint, radius)
  const currentPoints = [startPoint, endPoint]
  return currentPoints
}
