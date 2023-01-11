import { getCircleEndPoint } from './getCircleEndPoint'

import type { Measurement, Point } from '../../../types'

export function getExistingMeasurementPoints(measurement: Measurement): [Point, Point] {
  switch (measurement.type) {
    case 'ruler': {
      const rulerPoints = measurement.startAndEndPoint
      return rulerPoints
    }
    case 'area': {
      const { centerPoint, radius } = measurement
      const endPoint = getCircleEndPoint(centerPoint, radius)
      const circlePoints: [Point, Point] = [centerPoint, endPoint]
      return circlePoints
    }
    default:
      throw new Error("There's only a ruler and circle in the measurement types")
  }
}
