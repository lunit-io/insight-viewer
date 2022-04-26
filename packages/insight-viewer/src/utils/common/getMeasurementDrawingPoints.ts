import { Point, MeasurementMode } from '../../types'

export function getMeasurementDrawingPoints(prevPoints: Point[], currentPoint: Point, mode: MeasurementMode): Point[] {
  if (mode === 'ruler' || mode === 'circle') {
    return [prevPoints[0], currentPoint]
  }

  return prevPoints
}
