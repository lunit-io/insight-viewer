/* eslint-disable no-restricted-properties */
import { Annotation, Point } from '../../types'

export function checkFocusedCircle<T extends Annotation>(annotations: T[], cursor: Point): T | null {
  const result: T | undefined = annotations.find(annotation => {
    const [[cx, cy], [x1, y1]] = annotation.polygon
    const [x2, y2] = cursor

    const r1: number = Math.sqrt(Math.pow(Math.abs(x1 - cx), 2) + Math.pow(Math.abs(y1 - cy), 2))
    const r2: number = Math.sqrt(Math.pow(Math.abs(x2 - cx), 2) + Math.pow(Math.abs(y2 - cy), 2))

    return r2 <= r1
  })

  return result || null
}
