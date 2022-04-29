import { Point, Measurement, MeasurementMode } from '../../types'
import { getCircleRadius } from './getCircleRadius'
import { getCircleEditPoints } from './getCircleEditPoints'
import { Image } from '../../Viewer/types'

export type EditPoints = [number, number, number, number]

export function getEditPointPosition(
  image: Image | null,
  points: Point[],
  mode: MeasurementMode,
  editMeasurement: Measurement | null
): EditPoints | null {
  if (points.length < 2) return null

  const startPoint = points[0]
  const endPoint = points[1]

  if ((editMeasurement && editMeasurement.type === 'circle') || mode === 'circle') {
    const radius = getCircleRadius(points, image)
    const editPoints = getCircleEditPoints(startPoint, radius)

    return editPoints
  }

  // measurement type is ruler
  return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
}
