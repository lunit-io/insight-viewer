import type { Point, Annotation } from '../../types'

interface GetDrawingAnnotationParams {
  currentPoints: Point[]
  prevAnnotation: Annotation
}

export function getDrawingAnnotation({ currentPoints, prevAnnotation }: GetDrawingAnnotationParams): Annotation {
  const currentId = prevAnnotation.id

  if (prevAnnotation.type === 'circle') {
    return { ...prevAnnotation, center: currentPoints[0], id: currentId }
  }

  const currentAnnotation = { ...prevAnnotation, id: currentId }

  if (prevAnnotation.type === 'line' || prevAnnotation.type === 'text') {
    currentAnnotation.points = [currentPoints[0], currentPoints[1]]
  } else {
    currentAnnotation.points = currentPoints
  }

  return currentAnnotation
}
