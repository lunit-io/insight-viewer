import polylabel from 'polylabel'
import { LINE_TEXT_POSITION_SPACING, POINT_TEXT_POSITION_SPACING } from '../const'

import { getLineLength } from './getLineLength'
import { getTextPosition } from './getTextPosition'
import { getAnnotationPoints } from './getAnnotationPoints'
import { getCircleCenterPoint } from './getCircleCenterPoint'
import { isSamePoints } from './isSamePoints'
import { getMovedPoints } from './getMovedPoints'
import { getAreaAnnotationMovedPoints } from './getAnnotationPointsAfterMoving'
import { getCircleRadius, getCircleRadiusByMeasuringUnit } from '../utils/getCircleRadius'

import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../types'
import type { Annotation, EditMode } from '../types'

type LabelPosition = [number, number]

interface GetDrawingAnnotationParams {
  image: Image
  editMode: EditMode | null
  currentPoint: Point
  movedStartPoint: Point
  drawingStartPoint: Point
  prevAnnotation: Annotation
}

export function getPointsUpdatedAnnotation({
  image,
  editMode,
  currentPoint,
  drawingStartPoint,
  movedStartPoint,
  prevAnnotation,
}: GetDrawingAnnotationParams): Annotation {
  const currentId = prevAnnotation.id
  const isMoveMode = editMode === 'move' && movedStartPoint
  const isTextMoveMode = editMode === 'textMove' && movedStartPoint
  const prevPoints = getAnnotationPoints(prevAnnotation)

  if (isSamePoints([prevPoints[prevPoints.length - 1], currentPoint])) {
    return prevAnnotation
  }

  const currentAnnotation: Annotation = {
    ...prevAnnotation,
    id: currentId,
  }

  switch (currentAnnotation.type) {
    case 'line':
    case 'arrowLine': {
      const currentPoints = isMoveMode
        ? getMovedPoints({ prevPoints, editStartPoint: movedStartPoint, currentPoint })
        : [drawingStartPoint, currentPoint]

      const [xPosition, yPosition] = polylabel([currentPoints], 1)

      currentAnnotation.labelPosition = [
        xPosition - LINE_TEXT_POSITION_SPACING.x,
        yPosition - LINE_TEXT_POSITION_SPACING.y,
      ]

      currentAnnotation.points = currentPoints as [Point, Point]
      break
    }

    case 'text': {
      const currentPoints = isMoveMode
        ? getMovedPoints({ prevPoints, editStartPoint: movedStartPoint, currentPoint })
        : [drawingStartPoint, currentPoint]

      const labelPosition = polylabel([currentPoints], 1) as LabelPosition

      currentAnnotation.points = currentPoints as [Point, Point]
      currentAnnotation.labelPosition = labelPosition
      break
    }

    case 'point': {
      const labelPosition = [currentPoint[0], currentPoint[1] + POINT_TEXT_POSITION_SPACING] as LabelPosition

      currentAnnotation.point = currentPoint
      currentAnnotation.labelPosition = labelPosition
      break
    }

    case 'area': {
      if (isTextMoveMode) {
        currentAnnotation.textPoint = currentPoint
        break
      }

      const currentPoints = isMoveMode
        ? getAreaAnnotationMovedPoints(prevPoints, movedStartPoint, currentPoint)
        : [drawingStartPoint, currentPoint]
      const [startPoint, endPoint] = currentPoints

      const textPoint = getTextPosition(currentAnnotation, editMode)
      const centerPoint = getCircleCenterPoint(startPoint, endPoint)
      const radiusWithoutUnit = getCircleRadius(startPoint, endPoint)
      const { radius, unit } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)

      currentAnnotation.unit = unit
      currentAnnotation.textPoint = textPoint
      currentAnnotation.measuredValue = radius
      currentAnnotation.centerPoint = centerPoint
      currentAnnotation.radius = radiusWithoutUnit
      break
    }

    case 'ruler': {
      if (isTextMoveMode) {
        currentAnnotation.textPoint = currentPoint
        break
      }

      const currentPoints = isMoveMode
        ? getMovedPoints({ prevPoints, editStartPoint: movedStartPoint, currentPoint })
        : [drawingStartPoint, currentPoint]
      const [startPoint, endPoint] = currentPoints

      const textPoint = getTextPosition(currentAnnotation, editMode)
      const { length, unit } = getLineLength(startPoint, endPoint, image)

      currentAnnotation.startAndEndPoint = currentPoints as [Point, Point]
      currentAnnotation.measuredValue = length
      currentAnnotation.unit = unit
      currentAnnotation.textPoint = textPoint
      break
    }

    default: {
      // polygon, text, freeLine
      const currentPoints = isMoveMode
        ? getMovedPoints({ prevPoints, editStartPoint: movedStartPoint, currentPoint })
        : [...prevPoints, currentPoint]
      const labelPosition = polylabel([currentPoints], 1) as LabelPosition

      currentAnnotation.points = currentPoints
      currentAnnotation.labelPosition = labelPosition
      break
    }
  }

  return currentAnnotation
}
