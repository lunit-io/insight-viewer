import { Measurement, Point } from 'types'
import { getCircleCenterAndEndPoint } from './getCircleCenterAndEndPoint'
import { Image } from '../../Viewer/types'

export function getExistingMeasurementPoints(measurement: Measurement, image: Image | null): [Point, Point] {
  if (measurement.type === 'ruler') {
    const rulerPoints = measurement.points

    return rulerPoints
  }

  // measurement.type === 'circle'
  const { center, radius } = measurement
  const circlePoints = getCircleCenterAndEndPoint(center, radius, image)

  return circlePoints
}
