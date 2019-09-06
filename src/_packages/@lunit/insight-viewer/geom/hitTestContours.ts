import pointInPolygon from 'point-in-polygon';
import { Contour, Point } from '../types';

export function hitTestContours(contours: Contour[], cursor: Point): Contour | null {
  const result: Contour | undefined = contours.find(contour => {
    return pointInPolygon(cursor, contour.polygon);
  });
  
  return result || null;
}