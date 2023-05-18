import type { Point } from '../types'

export const stringifyPoints = (points: Point[]): string => {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ')
}
