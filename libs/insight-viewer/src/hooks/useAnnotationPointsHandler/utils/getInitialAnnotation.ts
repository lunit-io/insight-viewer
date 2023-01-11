import polylabel from 'polylabel'

import { LINE_TEXT_POSITION_SPACING } from '../../../const'

import type { Image } from '../../../Viewer/types'
import type { Point, LineHeadMode, AnnotationMode, Annotation } from '../../../types'

import { getCircleRadiusByMeasuringUnit } from '../../../utils/common/getCircleRadius'

interface GetInitialAnnotationParams {
  currentPoints: [Point, Point]
  image: Image | null
  mode: AnnotationMode
  annotations: Annotation[]
}

/**
 * The initial Annotation has the same start Point and end Point.
 * Because Annotation needs to be created based on the coordinates at the time of click.
 */
export function getInitialAnnotation({
  mode,
  image,
  annotations,
  currentPoints,
}: GetInitialAnnotationParams): Annotation {
  const currentId = annotations.length === 0 ? 1 : Math.max(...annotations.map(({ id }) => id), 0) + 1
  const [xPosition, yPosition] = polylabel([currentPoints], 1)

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  switch (mode) {
    case 'circle': {
      const [startPoint, endPoint] = currentPoints
      const { radius } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)

      return {
        ...defaultAnnotationInfo,
        type: 'circle',
        center: currentPoints[0],
        radius,
      }
    }
    case 'line': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: mode,
        points: currentPoints,
      }
    }
    case 'arrowLine': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: mode,
        points: currentPoints,
      }
    }
    case 'text': {
      return {
        ...defaultAnnotationInfo,
        type: mode,
        points: currentPoints,
        label: '',
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
