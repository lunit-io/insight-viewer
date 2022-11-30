import type { Annotation } from '../../../types'

export function checkIsInitialAnnotation(annotation: Annotation): boolean {
  if (annotation.type === 'circle') {
    return annotation.radius === 0
  }

  /**
   * The initial annotation has the same start Point and end Point values
   */
  const [startPoint, endPoint] = annotation.points
  const [startPointX, startPointY] = startPoint
  const [endPointX, endPointY] = endPoint

  return annotation.points.length === 2 && startPointX === endPointX && startPointY === endPointY
}
