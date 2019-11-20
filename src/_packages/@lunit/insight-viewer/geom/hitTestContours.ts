import pointInPolygon from 'point-in-polygon';
import { Contour, Point } from '../types';

export function hitTestContours<T extends Contour>(contours: T[], cursor: Point): T | null {
  const result: T | undefined = contours.find(contour => {
    return pointInPolygon(cursor, contour.polygon);
  });
  
  return result || null;
}