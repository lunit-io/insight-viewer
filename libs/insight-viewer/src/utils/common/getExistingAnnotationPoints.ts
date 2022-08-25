import { getCircleCenterAndEndPoint } from './getCircleCenterAndEndPoint'

import { Annotation, Point } from '../../types'
import { Image } from '../../Viewer/types'

export function getExistingAnnotationPoints(annotation: Annotation, image: Image | null): Point[] {
  if (annotation.type === 'circle') {
    const { center, radius } = annotation
    const circlePoints = getCircleCenterAndEndPoint(center, radius, image)

    return circlePoints
  }

  return annotation.points
}
