import type { Dispatch, SetStateAction } from 'react'
import type { Annotation, TextAnnotation } from '../../../types'
import type { Point, EditMode } from '../../../types'

interface SetInitialPointParams {
  hoveredAnnotation?: Annotation | null
  tempAnnotation: Annotation | undefined
  isSelectedAnnotation: boolean
  isDrawing: boolean
  setInitialAnnotation: (point: Point) => void
  setInitialDrawingPoints: (point: Point) => void
}

export const setInitialPointCallback =
  ({
    hoveredAnnotation,
    tempAnnotation,
    isSelectedAnnotation,
    isDrawing,
    setInitialAnnotation,
    setInitialDrawingPoints,
  }: SetInitialPointParams) =>
  (point: Point) => {
    if (hoveredAnnotation || tempAnnotation || (!isSelectedAnnotation && !isDrawing)) return

    setInitialAnnotation(point)
    setInitialDrawingPoints(point)
  }

interface AddDrawingPointParams {
  isSelectedAnnotation: boolean
  isDrawing: boolean
  editMode: EditMode | null
  updateDrawingAnnotation: (point: Point) => void
  setDrawingMovedPoint: (point: Point) => void
}

export const addDrawingPointCallback =
  ({
    isDrawing,
    isSelectedAnnotation,
    editMode,
    updateDrawingAnnotation,
    setDrawingMovedPoint,
  }: AddDrawingPointParams) =>
  (point: Point) => {
    if (!isSelectedAnnotation && !isDrawing) return
    if (isSelectedAnnotation && !editMode) return

    updateDrawingAnnotation(point)
    setDrawingMovedPoint(point)
  }

interface CancelDrawingParams {
  isSelectedAnnotation: boolean
  editMode: EditMode | null
  onSelect?: (annotation: Annotation | null) => void
  clearDrawingAndMovedPoints: () => void
  clearAnnotation: () => void
  clearEditMode: () => void
}

export const cancelDrawingCallback = ({
  isSelectedAnnotation,
  editMode,
  onSelect,
  clearAnnotation,
  clearDrawingAndMovedPoints,
  clearEditMode,
}: CancelDrawingParams) => {
  if (isSelectedAnnotation && editMode) {
    clearEditMode()
    clearDrawingAndMovedPoints()
    return
  }

  if (onSelect) {
    onSelect(null)
  }

  clearAnnotation()
  clearEditMode()
  clearDrawingAndMovedPoints()
}

interface AddDrewElementParams {
  annotation: Annotation | null
  tempAnnotation: TextAnnotation | undefined
  setTempAnnotation: Dispatch<SetStateAction<TextAnnotation | undefined>>
  addAnnotation: (annotation: Annotation) => void
}

export const addDrewAnnotationCallback = ({
  annotation,
  tempAnnotation,
  setTempAnnotation,
  addAnnotation,
}: AddDrewElementParams) => {
  if (annotation == null) return

  if (annotation.type === 'text' && !annotation.label) {
    // TODO: 추후 TextAnnotation 재설계 후 아래 주석과 코드 정리할 것.
    // a 의 좌표가 유효하지 않을경우 setTempAnnotation 이 아예 실행되지 않도록 로직 추가
    // Typing.tsx 에도 비슷한 코드가 존재하나 혹시 모를 사이드 이펙트를 고려하여 남겨둠
    const [start, end] = annotation.points

    if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
      return
    }

    if (!tempAnnotation) {
      setTempAnnotation(annotation)
    }

    return
  }

  addAnnotation(annotation as Annotation)
}
