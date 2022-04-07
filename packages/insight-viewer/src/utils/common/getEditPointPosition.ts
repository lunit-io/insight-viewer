import { Point, Measurement, MeasurementMode } from '../../types'
import { getCircleRadius } from './getCircleRadius'
import { getCircleEditPoints } from './getCircleEditPoints'

export type GetEditPointPositionReturnType = [number, number, number, number]

export function getEditPointPosition(
  points: Point[],
  mode: MeasurementMode,
  editMeasurement: Measurement | null
): GetEditPointPositionReturnType | null {
  if (points.length < 2) return null

  const [startPoint, endPoint] = points

  if ((editMeasurement && editMeasurement.type === 'circle') || mode === 'circle') {
    const radius = getCircleRadius(points)
    const editPoints = getCircleEditPoints(startPoint, radius)

    return editPoints
  }

  // measurement type is ruler
  return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
}
