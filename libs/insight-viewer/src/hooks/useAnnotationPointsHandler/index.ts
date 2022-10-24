import { useState, useEffect } from 'react'
import useTilg from 'tilg'

import { UseAnnotationPointsHandlerParams, UseAnnotationPointsHandlerReturnType } from './types'
import { Point, EditMode, Annotation } from '../../types'
import { useOverlayContext } from '../../contexts'
import { getAnnotationPoints } from '../../utils/common/getAnnotationPoints'
import { getDrawingAnnotation } from '../../utils/common/getDrawingAnnotation'
import { getInitialAnnotation } from '../../utils/common/getInitialAnnotation'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getExistingAnnotationPoints } from '../../utils/common/getExistingAnnotationPoints'

import useDrawingHandler from '../useDrawingHandler'
import { getCursorStatus } from '../useMeasurementPointsHandler/getCursorStatus'

export default function useAnnotationPointsHandler({
  mode,
  isEditing,
  lineHead,
  svgElement,
  annotations,
  selectedAnnotation,
  hoveredAnnotation,
  addAnnotation,
  onSelectAnnotation,
}: UseAnnotationPointsHandlerParams): UseAnnotationPointsHandlerReturnType {
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editStartPoint, setEditStartPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [annotation, setAnnotation] = useState<Annotation | null>(null)
  console.log('editMode', editMode)
  console.log('editStartPoint', editStartPoint)
  console.log('editTargetPoints', editTargetPoints)
  console.log('annotation', annotation)
  console.log('hoveredAnnotation', hoveredAnnotation)
  // useTilg()
  let cursor = 'idle'

  if (editStartPoint != null) {
    if (editMode === 'startPoint')
      if (selectedAnnotation != null) {
        cursor = 'move'
      } else {
        cursor = 'drawing'
      }
  }
  if (hoveredAnnotation != null) cursor = 'hovered'
  console.log('cursor', cursor)

  // const status = getCursorStatus({
  //   editMode,
  //   editStartPoint,
  //   mouseDownPoint,
  //   isEditing,
  // })

  // console.log('status', status)
  const { image, pixelToCanvas } = useOverlayContext()

  useEffect(() => {
    if (!isEditing || selectedAnnotation == null) return

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
  })

  return { annotation, editPoints: editTargetPoints, currentEditMode: editMode, setAnnotationEditMode }
}
