import { SetStateAction, Dispatch } from 'react'
import { Point, EditMode, AnnotationMode } from '../../types'
import { getMovedPoints } from './getMovedPoints'

export function getAnnotationEditingPoints(
  prevPoints: Point[],
  currentPoint: Point,
  editPoint: Point,
  editMode: EditMode,
  mode: AnnotationMode,
  setEditPoint: Dispatch<SetStateAction<Point | null>>
): Point[] {
  if ((mode === 'line' || mode === 'text') && editMode === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if ((mode === 'line' || mode === 'text') && editMode === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'circle' && (editMode === 'startPoint' || editMode === 'endPoint')) {
    return [prevPoints[0], currentPoint]
  }

  if (editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint: editPoint, currentPoint })
    setEditPoint(currentPoint)

    return movedPoint
  }

  return prevPoints
}
