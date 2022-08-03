import { Point, EditMode, MeasurementMode } from 'types'
import { getMovedPoints } from './getMovedPoints'

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
    return [prevPoints[0], currentPoint]
  }

  if ((mode === 'circle' || mode === 'ruler') && editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint, currentPoint })

    return movedPoint
  }

  return prevPoints
}
