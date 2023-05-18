import { useState, useEffect } from 'react'

import { getDrawingStartPoint } from '../../utils/getDrawingStartPoint'
import { getPointsUpdatedAnnotation } from '../../utils/getPointsUpdatedAnnotation'
import { createInitialAnnotation } from '../../utils/createInitialAnnotation'

import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../../types'
import type { Annotation as AnnotationType, EditMode, AnnotationMode } from '../../types'

interface UseCreatingAnnotationProps {
  id: number
  image: Image | null
  editMode: EditMode | null
  mode: AnnotationMode
  selectedAnnotation?: AnnotationType | null
}

const useCreatingAnnotation = ({ id, mode, image, editMode, selectedAnnotation }: UseCreatingAnnotationProps) => {
  const [annotation, setAnnotation] = useState<AnnotationType | null>(null)
  const [movedStartPoint, setMovedStartPoint] = useState<Point | null>(null)
  const [drawingStartPoint, setDrawingStartPoint] = useState<Point | null>(null)

  const setInitialAnnotation = (point: Point) => {
    if (annotation) return

    const initialAnnotation = createInitialAnnotation({
      id,
      mode,
      image,
      currentPoints: [point, point],
    })

    setAnnotation(initialAnnotation)
  }

  const updateDrawingAnnotation = (point: Point) => {
    if (image == null || drawingStartPoint == null || movedStartPoint == null) return

    setAnnotation((prevAnnotation) => {
      if (prevAnnotation == null) return prevAnnotation

      const updatedAnnotation = getPointsUpdatedAnnotation({
        image,
        editMode,
        prevAnnotation,
        movedStartPoint,
        drawingStartPoint,
        currentPoint: point,
      })

      return updatedAnnotation
    })
  }

  const clearAnnotation = () => {
    setAnnotation(null)
  }

  const setInitialDrawingPoints = (point: Point) => {
    const drawingStartPoint = getDrawingStartPoint({ mouseDownPoint: point, annotation })

    setDrawingStartPoint(drawingStartPoint)
    setMovedStartPoint(point)
  }

  const setDrawingMovedPoint = (point: Point) => {
    setMovedStartPoint(point)
  }

  const clearDrawingAndMovedPoints = () => {
    setMovedStartPoint(null)
    setDrawingStartPoint(null)
  }

  useEffect(() => {
    if (!selectedAnnotation) return

    setAnnotation(selectedAnnotation)
  }, [selectedAnnotation])

  return {
    annotation,
    drawingStartPoint,
    movedStartPoint,
    clearAnnotation,
    setInitialAnnotation,
    updateDrawingAnnotation,
    clearDrawingAndMovedPoints,
    setInitialDrawingPoints,
    setDrawingMovedPoint,
  }
}

export default useCreatingAnnotation
