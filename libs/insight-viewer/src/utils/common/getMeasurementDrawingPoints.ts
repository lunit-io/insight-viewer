import { Point, MeasurementMode } from '../../types'

export function getMeasurementDrawingPoints(
  prevPoints: [Point, Point],
  mouseDownPoint: Point,
  currentPoint: Point,
  mode: MeasurementMode
): [Point, Point] {
  if (mode === 'ruler') {
    return [prevPoints[0], currentPoint]
  }

  if (mode === 'circle') {
    return [mouseDownPoint, currentPoint]
  }

  return prevPoints
}
