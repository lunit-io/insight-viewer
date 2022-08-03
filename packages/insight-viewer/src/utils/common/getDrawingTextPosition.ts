import { Point, MeasurementMode } from 'types'
import { getRulerTextPosition } from './getRulerTextPosition'
import { getCircleTextPosition } from './getCircleTextPosition'
import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

export function getDrawingTextPosition(points: [Point, Point], mode: MeasurementMode): Point {
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
