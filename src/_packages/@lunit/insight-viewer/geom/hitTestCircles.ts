import { Contour, Point } from '../types';

export function hitTestCircles<T extends Contour>(contours: T[], cursor: Point): T | null {
  const result: T | undefined = contours.find(contour => {
    const [[cx, cy], [x1, y1]] = contour.polygon;
    const [x2, y2] = cursor;
    
    const r1: number = Math.sqrt(Math.pow(Math.abs(x1 - cx), 2) + Math.pow(Math.abs(y1 - cy), 2));
    const r2: number = Math.sqrt(Math.pow(Math.abs(x2 - cx), 2) + Math.pow(Math.abs(y2 - cy), 2));
    
    return r2 <= r1;
  });
  
  return result || null;
}