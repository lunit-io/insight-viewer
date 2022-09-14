import { getMovedPoints } from './getMovedPoints'
import { getCircleRadiusByCenter } from './getCircleRadius'
import { getCircleEndPoint } from './getCircleEndPoint'

import type { Point, EditMode, MeasurementMode } from '../../types'

export function getMeasurementEditingPoints(
  prevPoints: [Point, Point],
  currentPoint: Point,
  editStartPoint: Point,
  editMode: EditMode,
  mode: MeasurementMode
): [Point, Point] {
  if (mode === 'ruler' && editMode === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if (mode === 'ruler' && editMode === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'circle' && (editMode === 'startPoint' || editMode === 'endPoint')) {
    const prevCenter = prevPoints[0]

    const currentRadius = getCircleRadiusByCenter(prevCenter, currentPoint)
    const movedEndPoint = getCircleEndPoint(prevCenter, currentRadius)

    return [prevCenter, movedEndPoint]
  }

  if ((mode === 'circle' || mode === 'ruler') && editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint, currentPoint })

    return movedPoint
  }

  return prevPoints
}
