import { getCircleEditPoints } from './getCircleEditPoints'

import type { Point } from '../types'
import type { Annotation } from '../types'

/**
 * Get the default editing points of the annotation.
 *
 * The Polygon and FreeLine types are not supported editing points.
 *
 * So the polygon and FreeLine mode is returned as null.
 */
export const getAnnotationDefaultEditingPoints = (annotation: Annotation): [Point, Point] | null => {
  if (annotation.type === 'ruler') {
    const rulerPoints = annotation.startAndEndPoint

    return rulerPoints
  }

  if (annotation.type === 'area') {
    const { centerPoint, radius } = annotation
    const circleEditingPoints = getCircleEditPoints(centerPoint, radius)

    return circleEditingPoints
  }

  if (annotation.type === 'line' || annotation.type === 'arrowLine' || annotation.type === 'text') {
    const { points } = annotation

    return points
  }

  return null
}
