import { getIsComplexPolygon } from './getIsComplexPolygon'
import { isSamePoints } from '../../../utils/isSamePoints'
import { isLessThanTheMinimumPointsLength } from './isLessThanTheMinimumPointsLength'

import type { Annotation } from '../../../types'

export const validateAnnotation = (annotation: Annotation): Annotation | null => {
  if (
    annotation.type === 'polygon' &&
    (isLessThanTheMinimumPointsLength(annotation.points) || getIsComplexPolygon(annotation.points))
  )
    return null
  if (annotation.type === 'freeLine' && isLessThanTheMinimumPointsLength(annotation.points)) return null
  if ((annotation.type === 'line' || annotation.type === 'arrowLine') && isSamePoints(annotation.points)) return null
  if (annotation.type === 'ruler' && isSamePoints(annotation.startAndEndPoint)) return null
  if (annotation.type === 'area' && annotation.radius === 0) return null

  return annotation
}
