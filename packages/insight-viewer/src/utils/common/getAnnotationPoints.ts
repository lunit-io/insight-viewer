import type { Dispatch, SetStateAction } from 'react'

import type { Point, EditMode, Annotation, AnnotationMode } from '../../types'

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
  setEditStartPoint: Dispatch<SetStateAction<Point | null>>
}

export function getAnnotationPoints({
  mode,
  point,
  prevPoints,
  editMode,
  isEditing,
  editStartPoint,
  selectedAnnotation,
  setEditStartPoint,
}: GetAnnotationPointsParams): Point[] {
  if (isEditing && selectedAnnotation && editStartPoint && editMode) {
    return getAnnotationEditingPoints(
      prevPoints,
      point,
      editStartPoint,
      editMode,
      selectedAnnotation.type,
      setEditStartPoint
    )
  }

  return getAnnotationDrawingPoints(prevPoints, point, mode)
}
