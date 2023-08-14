import { useState, useEffect } from 'react'

import { getArrowPosition } from './utils/getArrowPosition'
import { getCircleEndPoint } from '../../utils/getCircleEndPoint'
import { calculateCircleArea } from '../../utils/calculateCircleArea'
import { stringifyPoints } from '../../utils/stringifyPoints'
import { getCircleRadiusByCenter } from '../../utils/getCircleRadius'

import type { DrawablePointAnnotation, Point } from '../../types'
import type {
  Annotation,
  DrawableAnnotation,
  DrawableAreaAnnotation,
  DrawableArrowLineAnnotation,
  DrawableFreeLineAnnotation,
  DrawableLineAnnotation,
  DrawablePolygonAnnotation,
  DrawableRulerAnnotation,
  DrawableTextAnnotation,
} from '../../types'

const formatCircleValue = (area: number, unit: string) =>
  `Area = ${area.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}${unit}2`

const formatRulerValue = (measuredValue: number, unit: string) => `${measuredValue.toFixed(1)}${unit}`

interface UseCreatingDrawableAnnotationProps {
  annotation: Annotation | null
  pixelToCanvas: (point: Point) => Point
}

const useCreatingDrawableAnnotation = ({
  annotation,
  pixelToCanvas,
}: UseCreatingDrawableAnnotationProps): { drawableAnnotation: DrawableAnnotation | null } => {
  const [drawableAnnotation, setDrawableAnnotation] = useState<DrawableAnnotation | null>(null)

  useEffect(() => {
    const canvasLabelPosition = annotation?.labelPosition ? pixelToCanvas(annotation.labelPosition) : null
    const initialDrawableAnnotationInfo = { canvasLabelPosition, cursorClassName: 'pointer' as const }

    let targetDrawableAnnotation: DrawableAnnotation | null = null

    switch (annotation?.type) {
      case 'polygon':
      case 'freeLine': {
        const canvasPoints = annotation.points.map(pixelToCanvas)
        const canvasPointsString = stringifyPoints(canvasPoints)

        const currentDrawableAnnotation: DrawablePolygonAnnotation | DrawableFreeLineAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          drawingPoints: canvasPoints,
          drawingPointsToString: canvasPointsString,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      case 'line': {
        const canvasPoints = annotation.points.map(pixelToCanvas) as [Point, Point]
        const canvasPointsString = stringifyPoints(canvasPoints)

        const currentDrawableAnnotation: DrawableLineAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          drawingPointsToString: canvasPointsString,
          drawingPoints: canvasPoints,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      case 'arrowLine': {
        const canvasPoints = annotation.points.map(pixelToCanvas) as [Point, Point]
        const canvasPointsString = stringifyPoints(canvasPoints)

        const arrowPosition = getArrowPosition(canvasPoints)
        const arrowPoints = stringifyPoints(arrowPosition)

        const currentDrawableAnnotation: DrawableArrowLineAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          drawingPoints: canvasPoints,
          drawingPointsToString: canvasPointsString,
          canvasArrowHeadPoints: arrowPoints,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      case 'point': {
        const canvasPoint = pixelToCanvas(annotation.point)
        const canvasPointString = stringifyPoints([canvasPoint])

        const currentDrawableAnnotation: DrawablePointAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          drawingPoint: canvasPoint,
          drawingPointsToString: canvasPointString,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      case 'text': {
        const canvasPoints = annotation.points.map(pixelToCanvas) as [Point, Point]
        const [start, end] = canvasPoints

        if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
          targetDrawableAnnotation = null
        } else {
          const dimensions: [number, number] = [end[0] - start[0], end[1] - start[1]]

          const currentDrawableAnnotation: DrawableTextAnnotation = {
            ...annotation,
            ...initialDrawableAnnotationInfo,
            drawingPoints: canvasPoints,
            dimensions,
          }

          targetDrawableAnnotation = currentDrawableAnnotation
        }
        break
      }

      case 'area': {
        const { centerPoint, radius, measuredValue, unit } = annotation
        const endPoint = getCircleEndPoint(centerPoint, radius)
        const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)
        const drawingRadius = getCircleRadiusByCenter(centerPointOnCanvas, endPointOnCanvas)
        const area = calculateCircleArea(measuredValue)
        const formattedValue = formatCircleValue(area, unit)

        const currentDrawableAnnotation: DrawableAreaAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          formattedValue,
          drawingCenter: centerPointOnCanvas,
          drawingRadius,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      case 'ruler': {
        const { startAndEndPoint, measuredValue, unit } = annotation
        const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
        const canvasPointsString = stringifyPoints(startAndEndPointOnCanvas)
        const formattedValue = formatRulerValue(measuredValue, unit)

        const currentDrawableAnnotation: DrawableRulerAnnotation = {
          ...annotation,
          ...initialDrawableAnnotationInfo,
          formattedValue,
          drawingPointsToString: canvasPointsString,
          drawingPoints: startAndEndPointOnCanvas,
        }

        targetDrawableAnnotation = currentDrawableAnnotation
        break
      }

      default:
        break
    }

    setDrawableAnnotation(targetDrawableAnnotation)
  }, [annotation, pixelToCanvas])

  return { drawableAnnotation }
}

export default useCreatingDrawableAnnotation
