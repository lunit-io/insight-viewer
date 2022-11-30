import type { Point } from '../../../types'
import { isLessThanTheMinimumPointsLength } from './isLessThanTheMinimumPointsLength'

describe('isLessThanTheMinimumPointsLength: ', () => {
  it('should return true if points length is less than munimum points length', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
    ]

    expect(isLessThanTheMinimumPointsLength(MOCK_POINTS)).toEqual(true)
  })

  it('should return false if points length is more than munimum points length', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
      [10, 20],
      [30, 40],
      [40, 60],
      [80, 100],
    ]

    expect(isLessThanTheMinimumPointsLength(MOCK_POINTS)).toEqual(false)
  })
})
