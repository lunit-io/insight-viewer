import { getCircleEndPoint } from '../../hooks/useMeasurementPointsHandler/utils/getCircleEndPoint'

import type { Annotation, Point } from '../types'

export function getAnnotationPoints(annotation: Annotation): Point[] {
  if (annotation.type === 'ruler') {
    const rulerPoints = annotation.startAndEndPoint

    return rulerPoints
  }

  if (annotation.type === 'area') {
    const { centerPoint, radius } = annotation
    const endPoint = getCircleEndPoint(centerPoint, radius)
    const areaPoints: [Point, Point] = [centerPoint, endPoint]

    return areaPoints
  }

  if (annotation.type === 'circle') {
    const { center, radius } = annotation
    const endPoint = getCircleEndPoint(center, radius)
    const circlePoints: [Point, Point] = [center, endPoint]

    return circlePoints
  }

  return annotation.points
}
