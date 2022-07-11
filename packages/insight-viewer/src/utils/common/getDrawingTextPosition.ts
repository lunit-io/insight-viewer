import { getRulerTextPosition } from './getRulerTextPosition'
import { getCircleTextPosition } from './getCircleTextPosition'
import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

import { Point, MeasurementMode, Measurement } from '../../types'

export function getDrawingTextPosition(
  points: [Point, Point],
  mode: MeasurementMode,
  prevDrawingMeasurement: Measurement | null
): Point {
  if (prevDrawingMeasurement?.isEditingTextPoint) {
    return prevDrawingMeasurement.textPoint
  }

  if (mode === 'ruler') {
    // index 1 of Points array is the end point in ruler mode
    const rulerTextPosition = getRulerTextPosition(points[1])

    return rulerTextPosition
  }
  // mode === 'circle'
  const drawingRadius = getLineLengthWithoutImage(points[0], points[1])
  const circleTextPosition = getCircleTextPosition(points[0], drawingRadius)

  return circleTextPosition
}
