import { Point, EditMode, AnnotationMode } from '../../../types'
import { getMovedPoints } from '../../../utils/common/getMovedPoints'

export function getAnnotationEditingPoints(
  prevPoints: Point[],
  currentPoint: Point,
  editPoint: Point,
  editMode: EditMode,
  mode: AnnotationMode
): Point[] {
  if ((mode === 'line' || mode === 'arrowLine' || mode === 'text') && editMode === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if ((mode === 'line' || mode === 'arrowLine' || mode === 'text') && editMode === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'circle' && (editMode === 'startPoint' || editMode === 'endPoint')) {
    return [prevPoints[0], currentPoint]
  }

  if (editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint: editPoint, currentPoint })

    return movedPoint
  }

  return prevPoints
}
