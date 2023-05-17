import type { Point } from '../types'

export const calculateLengthBetweenPoints = (
  [startX, startY]: Point,
  [endX, endY]: Point,
  col = 1,
  row = 1
): number => {
  const xPow = Math.pow(Math.abs(endX - startX) * col, 2)
  const yPow = Math.pow(Math.abs(endY - startY) * row, 2)

  return Math.sqrt(xPow + yPow)
}
