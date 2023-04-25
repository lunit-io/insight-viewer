import { getCircleEndPoint } from './getCircleEndPoint'

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

  return annotation.points
}
