import { getCursorStatus } from './../../utils/common/getCursorStatus'
import { useState, useEffect } from 'react'

import { useOverlayContext } from '../../contexts'
import { getAnnotationPoints } from '../../utils/common/getAnnotationPoints'
import { getDrawingAnnotation } from '../../utils/common/getDrawingAnnotation'
import { getInitialAnnotation } from '../../utils/common/getInitialAnnotation'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getExistingAnnotationPoints } from '../../utils/common/getExistingAnnotationPoints'
import { setClassName } from '../../utils/common/setClassName'

import useDrawingHandler from '../useDrawingHandler'

import type { UseAnnotationPointsHandlerParams, UseAnnotationPointsHandlerReturnType } from './types'
import type { Point, EditMode, Annotation } from '../../types'

export default function useAnnotationPointsHandler({
  mode,
  isEditing,
  lineHead,
  svgElement,
  annotations,
  selectedAnnotation,
  addAnnotation,
  onSelectAnnotation,
  hoveredAnnotation,
}: UseAnnotationPointsHandlerParams): UseAnnotationPointsHandlerReturnType {
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editStartPoint, setEditStartPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [annotation, setAnnotation] = useState<Annotation | null>(null)

  const { image, pixelToCanvas, enabledElement } = useOverlayContext()

  const cursorStatus = getCursorStatus({
    drawing: annotation,
    selectedDrawing: selectedAnnotation,
    editTargetPoints,
    editMode,
    editStartPoint,
  })

  setClassName(enabledElement, cursorStatus)

  useEffect(() => {
    if (!isEditing || selectedAnnotation == null) {
      setEditMode(null)
      setAnnotation(null)
      setEditStartPoint(null)
      onSelectAnnotation(null)
      setEditTargetPoints(null)
      return
    }

    const selectedAnnotationPoints = getExistingAnnotationPoints(selectedAnnotation, image)
    const currentPoints = selectedAnnotationPoints.map(pixelToCanvas)
    const currentEditPoint = getEditPointPosition(currentPoints, selectedAnnotation)

    setAnnotation(selectedAnnotation)
    setEditTargetPoints(currentEditPoint)
  }, [image, isEditing, selectedAnnotation, pixelToCanvas])

  const setInitialAnnotation = (point: Point) => {
    if (isEditing && selectedAnnotation) {
      setEditStartPoint(point)
      return
    }

    const initialAnnotation = getInitialAnnotation({
      mode,
      image,
      lineHead,
      annotations,
      currentPoints: [point, point],
    })

    setAnnotation(initialAnnotation)
  }

  const addDrawingAnnotation = (point: Point) => {
    if (isEditing && selectedAnnotation != null && !editMode) return

    if (annotation == null) {
      setAnnotation(null)
      return
    }

    const prevPoints = getExistingAnnotationPoints(annotation, image)
    const currentPoints = getAnnotationPoints({
      mode,
      point,
      editMode,
      isEditing,
      prevPoints,
      editStartPoint,
      selectedAnnotation,
    })

    setEditStartPoint(point)

    const canvasPoints = currentPoints.map(pixelToCanvas)
    const editPoints = getEditPointPosition(canvasPoints, selectedAnnotation)

    setEditTargetPoints(editPoints)

    const currentAnnotation = getDrawingAnnotation({
      currentPoints,
      prevAnnotation: annotation,
    })

    setAnnotation(currentAnnotation)
  }

  const cancelDrawing = () => {
    if (isEditing && selectedAnnotation != null && editMode) {
      setEditMode(null)
      return
    }

    setEditMode(null)
    setAnnotation(null)
    setEditStartPoint(null)
    onSelectAnnotation(null)
    setEditTargetPoints(null)
  }

  const addDrewAnnotation = () => {
    const isEditingMode = editMode && selectedAnnotation

    if (!annotation || isEditingMode) return

    addAnnotation(annotation)
  }

  const setAnnotationEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedAnnotation) return

    setEditMode(targetPoint)
  }

  useDrawingHandler({
    mode,
    svgElement,
    setInitialPoint: setInitialAnnotation,
    addDrawingPoint: addDrawingAnnotation,
    cancelDrawing,
    addDrewElement: addDrewAnnotation,
    hoveredDrawing: hoveredAnnotation,
  })

  return { annotation, editPoints: editTargetPoints, currentEditMode: editMode, setAnnotationEditMode, cursorStatus }
}
