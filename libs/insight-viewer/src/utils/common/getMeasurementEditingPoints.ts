import { getMovedPoints } from './getMovedPoints'
import { getCircleRadius, getCircleRadiusByCenter } from './getCircleRadius'
import { getCircleEndPoint } from './getCircleEndPoint'

import type { Point, EditMode, MeasurementMode } from '../../types'
import { EditPoints, getEditPointPosition } from './getEditPointPosition'
import { getCircleCenterPoint } from './getCircleCenterPoint'
// import { Measurement } from '@lunit/insight-viewer'

export function getMeasurementEditingPoints(
  prevPoints: [Point, Point], // center, end
  currentPoint: Point, // mouseMove
  editTargetPoints: EditPoints,
  editStartPoint: Point,
  editMode: EditMode,
  // selectedMeasurement: Measurement
  mode: MeasurementMode
): [Point, Point] {
  if (mode === 'ruler' && editMode === 'startPoint') {
    return [currentPoint, prevPoints[1]]
  }

  if (mode === 'ruler' && editMode === 'endPoint') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'circle' && (editMode === 'startPoint' || editMode === 'endPoint')) {
    const prevEditStart: Point = [editTargetPoints[0], editTargetPoints[1]]
    const prevEditEnd: Point = [editTargetPoints[2], editTargetPoints[3]]

    const editPoint: [Point, Point] =
      editMode === 'startPoint' ? [currentPoint, prevEditEnd] : [currentPoint, prevEditStart]
    return editPoint
  }

  if ((mode === 'circle' || mode === 'ruler') && editMode === 'move') {
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint, currentPoint })

    return movedPoint
  }

  return prevPoints
}
