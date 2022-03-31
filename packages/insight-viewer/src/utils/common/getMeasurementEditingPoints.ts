import { SetStateAction, Dispatch } from 'react'
import { Point, EditMode, MeasurementMode } from '../../types'
import { getMoveRulerPoints } from './getMoveRulerPoints'

export function getMeasurementEditingPoints(
  prevPoints: Point[],
  currentPoint: Point,
  editPoint: Point,
  target: EditMode,
  mode: MeasurementMode,
  setEditPoint: Dispatch<SetStateAction<Point | null>>
): Point[] {
  if (mode === 'ruler' && target === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if (mode === 'ruler' && target === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'ruler' && target === 'line') {
    const movedPoint = getMoveRulerPoints({ prevPoints, editStartPoint: editPoint, currentPoint })
    setEditPoint(currentPoint)

    return movedPoint
  }

  return prevPoints
}
