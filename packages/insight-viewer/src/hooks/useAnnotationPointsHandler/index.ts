import { useState, useEffect } from 'react'

import { UseAnnotationPointsHandlerParams, UseAnnotationPointsHandlerReturnType } from './types'
import { Point, EditMode } from '../../types'
import { useOverlayContext } from '../../contexts'
import { calculateDistance } from '../../utils/common/calculateDistance'
import { getDrewAnnotation } from '../../utils/common/getDrewAnnotation'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getAnnotationDrawingPoints } from '../../utils/common/getAnnotationDrawingPoints'
import { getAnnotationEditingPoints } from '../../utils/common/getAnnotationEditingPoints'
import useDrawingHandler from '../useDrawingHandler'

export default function useAnnotationPointsHandler({
  mode,
  isEditing,
  lineHead,
  svgElement,
  annotations,
  selectedAnnotation,
  addAnnotation,
  onSelectAnnotation,
}: UseAnnotationPointsHandlerParams): UseAnnotationPointsHandlerReturnType {
  const [points, setPoints] = useState<Point[]>([])
  const [editPoint, setEditPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [editMode, setEditMode] = useState<EditMode | null>(null)

  const { image, pixelToCanvas } = useOverlayContext()

  const isAnnotationEditing = isEditing && selectedAnnotation && editMode

  useEffect(() => {
    const pixelPoints = points.map(pixelToCanvas)
    const editPoints = getEditPointPosition(pixelPoints, selectedAnnotation)

    setEditTargetPoints(editPoints)
  }, [image, points, mode, selectedAnnotation, pixelToCanvas])

  useEffect(() => {
    if (!isEditing || !selectedAnnotation) return

    if (selectedAnnotation.type === 'circle') {
      const { center, radius } = selectedAnnotation
      const calculatedDistance = calculateDistance(radius, image)
      const endPoint: Point = [center[0] + (calculatedDistance ?? 0), center[1]]

      setPoints([center, endPoint])
    } else {
      setPoints(selectedAnnotation.points)
    }
  }, [image, isEditing, selectedAnnotation])

  const addStartPoint = (point: Point) => {
    if (isEditing && selectedAnnotation) {
      setEditPoint(point)
      return
    }

    setPoints([point])
  }

  const addDrawingPoint = (point: Point) => {
    setPoints(prevPoints => {
      const isPrepareEditing = isEditing && selectedAnnotation && !editMode

      if (prevPoints.length === 0 || isPrepareEditing) return prevPoints

      if (isEditing && selectedAnnotation && editMode && editPoint) {
        const editedPoints = getAnnotationEditingPoints(
          prevPoints,
          point,
          editPoint,
          editMode,
          selectedAnnotation.type,
          setEditPoint
        )

        return editedPoints
      }

      const drawingPoints = getAnnotationDrawingPoints(prevPoints, point, mode)

      return drawingPoints
    })
  }

  const cancelDrawing = () => {
    if (isAnnotationEditing) {
      setEditMode(null)
      return
    }

    setPoints([])
    setEditPoint(null)
    setEditMode(null)
    onSelectAnnotation(null)
  }

  const addDrewAnnotation = () => {
    if (isAnnotationEditing) return

    if (points.length > 1) {
      const drawingMode = isEditing && selectedAnnotation ? selectedAnnotation.type : mode
      const drewAnnotation = getDrewAnnotation(image, points, drawingMode, lineHead, annotations)
      if (selectedAnnotation?.type === 'text') {
        drewAnnotation.label = selectedAnnotation.label
      }
      addAnnotation(drewAnnotation)
    }
  }

  const setAnnotationEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedAnnotation) return

    setEditMode(targetPoint)
  }

  useDrawingHandler({
    mode,
    svgElement,
    setInitialPoint: addStartPoint,
    addDrawingPoint,
    cancelDrawing,
    addDrewElement: addDrewAnnotation,
  })

  return { points, editPoints: editTargetPoints, currentEditMode: editMode, setAnnotationEditMode }
}
