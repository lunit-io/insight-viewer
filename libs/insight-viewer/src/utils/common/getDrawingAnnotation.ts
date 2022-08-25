import polylabel from 'polylabel'

import type { Point, Annotation } from '../../types'
import { LINE_TEXT_POSITION_SPACING } from '../../const'

interface GetDrawingAnnotationParams {
  currentPoints: Point[]
  prevAnnotation: Annotation
}

export function getDrawingAnnotation({ currentPoints, prevAnnotation }: GetDrawingAnnotationParams): Annotation {
  const currentId = prevAnnotation.id
  const [xPosition, yPosition] = polylabel([currentPoints], 1)

  if (prevAnnotation.type === 'circle') {
    return { ...prevAnnotation, center: currentPoints[0], id: currentId, labelPosition: [xPosition, yPosition] }
  }

  const currentAnnotation: Annotation = { ...prevAnnotation, id: currentId, labelPosition: [xPosition, yPosition] }

  if (prevAnnotation.type === 'line') {
    currentAnnotation.labelPosition = [
      xPosition - LINE_TEXT_POSITION_SPACING.x,
      yPosition - LINE_TEXT_POSITION_SPACING.y,
    ]
    currentAnnotation.points = [currentPoints[0], currentPoints[1]]
  } else if (prevAnnotation.type === 'text') {
    currentAnnotation.points = [currentPoints[0], currentPoints[1]]
  } else {
    currentAnnotation.points = currentPoints
  }

  return currentAnnotation
}
