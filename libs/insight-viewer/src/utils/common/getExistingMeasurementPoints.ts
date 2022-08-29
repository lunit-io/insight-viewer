import { getCircleCenterAndEndPoint } from './getCircleCenterAndEndPoint'

import { Measurement, Point } from '../../types'
import { Image } from '../../Viewer/types'

export function getExistingMeasurementPoints(measurement: Measurement, image: Image | null): [Point, Point] {
  if (measurement.type === 'ruler') {
    const rulerPoints = measurement.startAndEndPoint

    return rulerPoints
  }

  // measurement.type === 'circle'
  const { centerPoint, radius } = measurement
  const circlePoints = getCircleCenterAndEndPoint(centerPoint, radius, image)

  return circlePoints
}
