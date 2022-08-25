/* eslint-disable no-restricted-properties */
import { Point } from '../../types'

export function getLineLengthWithoutImage(startPoint: Point, endPoint: Point): number {
  const [startX, startY] = startPoint
  const [endX, endY] = endPoint
  const xPow = Math.pow(Math.abs(endX - startX), 2)
  const yPow = Math.pow(Math.abs(endY - startY), 2)

  return Math.sqrt(xPow + yPow)
}
