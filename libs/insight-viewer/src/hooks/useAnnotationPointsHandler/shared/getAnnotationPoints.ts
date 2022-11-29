import type { Point, EditMode, Annotation, AnnotationMode } from '../../../types'

import { isSamePoints } from '../../../utils/common/isSamePoints'
import { getAnnotationEditingPoints } from './getAnnotationEditingPoints'
import { getAnnotationDrawingPoints } from './getAnnotationDrawingPoints'

interface GetAnnotationPointsParams {
  point: Point
  prevPoints: Point[]
  isEditing: boolean
  mode: AnnotationMode
  editMode: EditMode | null
  editStartPoint: Point | null
  selectedAnnotation: Annotation | null
}

export function getAnnotationPoints({
  mode,
  point,
  prevPoints,
  editMode,
  isEditing,
  editStartPoint,
  selectedAnnotation,
}: GetAnnotationPointsParams): Point[] {
  /**
   * If the last point of the previous point array and
   * the current point are the same,
   * the current point is not included in the points array.
   */
  if (isSamePoints([prevPoints[prevPoints.length - 1], point])) return prevPoints

  if (isEditing && selectedAnnotation && editStartPoint && editMode) {
    return getAnnotationEditingPoints(prevPoints, point, editStartPoint, editMode, selectedAnnotation.type)
  }

  return getAnnotationDrawingPoints(prevPoints, point, mode)
}
