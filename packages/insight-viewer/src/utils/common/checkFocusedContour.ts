import pointInPolygon from 'point-in-polygon'
import { Annotation, Point } from '../../types'

export function checkFocusedContour<T extends Annotation>(contours: T[], cursor: Point): T | null {
  const result: T | undefined = contours.find(contour => pointInPolygon(cursor, contour.layer.points))

  return result || null
}
