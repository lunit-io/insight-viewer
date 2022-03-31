import { Point, Measurement } from '../../types'
import { getCircleRadius } from './getCircleRadius'
import { getCircleEditPoints } from './getCircleEditPoints'

export type GetEditPointPositionReturnType = [number, number, number, number]

export function getEditPointPosition(
  points: Point[],
  editMeasurement: Measurement | null
): GetEditPointPositionReturnType | null {
  if (points.length < 2 || !editMeasurement) return null

  const [startPoint, endPoint] = points

  if (editMeasurement.type === 'circle') {
    const radius = getCircleRadius(points)
    const editPoints = getCircleEditPoints(startPoint, radius)

    return editPoints
  }

  // measurement type is ruler
  return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
}
