import { findFarthestPoint } from './findFarthestPoint'
import { getAnnotationDefaultEditingPoints } from './getAnnotationDefaultEditingPoints'

import type { Point } from '../types'
import type { Annotation as AnnotationType } from '../types'

interface GetDrawingStartPointParams {
  mouseDownPoint: Point
  annotation: AnnotationType | null
}

/**
 * If there is an annotation selected,
 *
 * Drawing start point should be obtained based
 *
 * on the Editing point and the currently clicked coordinate value.
 *
 * This function obtains its value.
 */
export const getDrawingStartPoint = ({ mouseDownPoint, annotation }: GetDrawingStartPointParams) => {
  if (annotation == null) return mouseDownPoint

  const defaultEditingPoints = getAnnotationDefaultEditingPoints(annotation)

  if (defaultEditingPoints == null) return mouseDownPoint

  /**
   * Sets the editing point away from the currently clicked
   * coordinate value as the drawing start coordinate value.
   *
   * Of the two points, the mouse down point is the point being changed.
   * The further point is the drawing start point.
   */
  const farthestPoint = findFarthestPoint(mouseDownPoint, defaultEditingPoints)

  return farthestPoint
}
