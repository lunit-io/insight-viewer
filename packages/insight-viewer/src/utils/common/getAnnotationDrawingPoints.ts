import { Point, AnnotationMode } from 'types'

export function getAnnotationDrawingPoints(prevPoints: Point[], point: Point, mode: AnnotationMode): Point[] {
  if (mode === 'polygon' || mode === 'freeLine') {
    return [...prevPoints, point]
  }

  if (mode === 'circle' || mode === 'line' || mode === 'text') {
    return [prevPoints[0], point]
  }

  return prevPoints
}
