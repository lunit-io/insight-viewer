import { getMovedPoints } from '../../../utils/common/getMovedPoints'

import type { Point, EditMode, MeasurementMode } from '../../../types'

export function getMeasurementEditingPoints(
  prevPoints: [Point, Point],
  currentPoint: Point,
  editStartPoint: Point,
  editMode: EditMode,
  mode: MeasurementMode
): [Point, Point] {
  if ((mode === 'ruler' || mode === 'area') && editMode === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if ((mode === 'ruler' || mode === 'area') && editMode === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if ((mode === 'area' || mode === 'ruler') && editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint, currentPoint }) as [Point, Point]

    return movedPoint
  }

  return prevPoints
}
