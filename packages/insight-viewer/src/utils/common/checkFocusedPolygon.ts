import pointInPolygon from 'point-in-polygon'
import { PolygonAnnotation, Point } from 'types'

export function checkFocusedPolygon(contours: PolygonAnnotation[], cursor: Point): PolygonAnnotation | null {
  const result: PolygonAnnotation | undefined = contours.find(contour => pointInPolygon(cursor, contour.points))

  return result || null
}
