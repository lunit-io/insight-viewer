import type { Point } from '../types'
import { stringifyPoints } from './stringifyPoints'

describe('stringifyPoints', () => {
  it('should stringify points', () => {
    const points1: Point[] = [
      [1, 2],
      [3, 4],
    ]
    const points2: Point[] = [
      [1, 2],
      [3, 4],
      [5, 2],
      [3, 6],
    ]
    const points3: Point[] = [
      [100, 299],
      [332, 411],
      [511, 211],
    ]

    expect(stringifyPoints(points1)).toBe('1,2 3,4')
    expect(stringifyPoints(points2)).toBe('1,2 3,4 5,2 3,6')
    expect(stringifyPoints(points3)).toBe('100,299 332,411 511,211')
  })
})
