import { useState, RefObject } from 'react'

import { Point, AnnotationMode, Annotation, LineHeadMode } from '../../types'
import { getDrewAnnotation } from '../../utils/common/getDrewAnnotation'
import { getAnnotationDrawingPoints } from '../../utils/common/getAnnotationDrawingPoints'
import useDrawingHandler from '../useDrawingHandler'
import { useOverlayContext } from '../../contexts'

interface UseAnnotationPointsHandlerProps {
  mode: AnnotationMode
  lineHead: LineHeadMode
  annotations: Annotation[]
  svgElement: RefObject<SVGSVGElement> | null
  addAnnotation: (annotation: Annotation) => void
}

interface UseAnnotationPointsHandlerReturnType {
  points: Point[]
}

export default function useAnnotationPointsHandler({
  mode,
  lineHead,
  annotations,
  svgElement,
  addAnnotation,
}: UseAnnotationPointsHandlerProps): UseAnnotationPointsHandlerReturnType {
  const [points, setPoints] = useState<Point[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)

  const { image } = useOverlayContext()

  const addStartPoint = (point: Point) => {
    setPoints([point])
    setIsDrawingMode(true)
  }

  const addDrawingPoint = (point: Point) => {
    setPoints(prevPoints => {
      if (points.length === 0 || !isDrawingMode) return prevPoints

      const drawingPoints = getAnnotationDrawingPoints(prevPoints, point, mode)

      return drawingPoints
    })
  }

  const addDrewAnnotation = () => {
    if (points.length > 1) {
      const drewAnnotation = getDrewAnnotation(image, points, mode, lineHead, annotations)

      addAnnotation(drewAnnotation)
    }
  }

  const cancelDrawing = () => {
    setPoints([])
    setIsDrawingMode(false)
  }

  useDrawingHandler({
    mode,
    svgElement,
    addStartPoint,
    addDrawingPoint,
    cancelDrawing,
    addDrewElement: addDrewAnnotation,
  })

  return { points }
}
