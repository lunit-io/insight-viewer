import type { Point } from '../types'
import type { AnnotationMode } from '../types'

export function getEditingPoints(
  prevPoints: Point[],
  currentPoint: Point,
  mode: AnnotationMode,
  editingStartPoint: Point
): Point[] {
  if (mode === 'polygon' || mode === 'freeLine') {
    return [...prevPoints, currentPoint]
  }

  /**
   * In the area mode, the coordinate required for drawing is start point end point.
   * However, only center and radius can know the two modes,
   * so setting them to editingStartPoint, current point values.
   */
  if (mode === 'area') {
    const circlePoints = [editingStartPoint, currentPoint]

    return circlePoints
  }

  if (mode === 'line' || mode === 'arrowLine' || mode === 'text' || mode === 'ruler') {
    return [editingStartPoint, currentPoint]
  }

  return prevPoints
}
