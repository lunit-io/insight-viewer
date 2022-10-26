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

  if (mode === 'circle' && editMode === 'startPoint') {
    const editStartPoint: Point = [editTargetPoints[0], editTargetPoints[1]]
    const prevEditEnd: Point = [editTargetPoints[2], editTargetPoints[3]]
    const movedPoint = getMovedPoints({ prevPoints, editStartPoint, currentPoint })
    const currentRadius = getCircleRadius(currentPoint, prevEditEnd)

    // const movedCenter = getCircleCenterPoint(currentPoint, prevEditEnd)
    // const currentRadius = getCircleRadiusByCenter(movedCenter, prevEditEnd)
    const movedEnd = getCircleEndPoint(movedPoint[0], currentRadius)

    // console.log(prevEditEnd, movedCenter, currentRadius)
    return [movedPoint[0], movedEnd]
  }

  // if (mode === 'circle' && (editMode === 'startPoint' || editMode === 'endPoint')) {
  //   console.log(editTargetPoints)
  //   const staticPoint: Point =
  //     editMode === 'startPoint'
  //       ? [editTargetPoints[2], editTargetPoints[3]]
  //       : [editTargetPoints[0], editTargetPoints[1]]

  //   const currentRadius = getCircleRadius(staticPoint, currentPoint)
  //   const movedCenter = getCircleCenterPoint(staticPoint, currentPoint)
  //   const movedEnd = getCircleEndPoint(movedCenter, currentRadius)

  //   return [movedCenter, movedEnd]
  // }

  // if (mode === 'circle' && editMode === 'endPoint') {
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
