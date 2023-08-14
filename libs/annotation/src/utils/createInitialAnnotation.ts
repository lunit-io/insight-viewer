import polylabel from 'polylabel'
import { LINE_TEXT_POSITION_SPACING, POINT_TEXT_POSITION_SPACING } from '../const'

import { getLineLength } from './getLineLength'
import { getCircleCenterPoint } from './getCircleCenterPoint'
import { getCircleRadius, getCircleRadiusByMeasuringUnit } from '../utils/getCircleRadius'

import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../types'
import type { AnnotationMode, Annotation } from '../types'

const INITIAL_LINE_WIDTH = 1.5

interface GetInitialAnnotationParams {
  id: number
  image: Image | null
  currentPoints: [Point, Point]
  mode: AnnotationMode
}

/**
 * The initial Annotation has the same start Point and end Point.
 * Because Annotation needs to be created based on the coordinates at the time of click.
 */
export function createInitialAnnotation({ id, mode, image, currentPoints }: GetInitialAnnotationParams): Annotation {
  const [startPoint, endPoint] = currentPoints
  const [xPosition, yPosition] = polylabel([currentPoints], 1)

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id,
    labelPosition: [xPosition, yPosition],
    lineWidth: INITIAL_LINE_WIDTH,
  }

  switch (mode) {
    case 'line': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: 'line',
        points: currentPoints,
      }
    }
    case 'arrowLine': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: 'arrowLine',
        points: currentPoints,
      }
    }
    case 'text': {
      return {
        ...defaultAnnotationInfo,
        type: 'text',
        points: currentPoints,
        label: '',
      }
    }
    case 'point': {
      return {
        ...defaultAnnotationInfo,
        type: 'point',
        point: startPoint,
        labelPosition: [xPosition, yPosition + POINT_TEXT_POSITION_SPACING],
      }
    }
    case 'ruler': {
      const { length, unit } = getLineLength(startPoint, endPoint, image)

      return {
        ...defaultAnnotationInfo,
        type: 'ruler',
        startAndEndPoint: currentPoints,
        measuredValue: length,
        unit,
        textPoint: null,
      }
    }
    case 'area': {
      const centerPoint = getCircleCenterPoint(startPoint, endPoint)
      const radiusWithoutUnit = getCircleRadius(startPoint, endPoint)
      const { radius, unit } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)

      return {
        ...defaultAnnotationInfo,
        type: 'area',
        centerPoint: centerPoint,
        radius: radiusWithoutUnit,
        measuredValue: radius,
        unit,
        textPoint: null,
      }
    }
    default: {
      return {
        ...defaultAnnotationInfo,
        type: mode,
        points: currentPoints,
      }
    }
  }
}
