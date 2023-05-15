import type { Point } from '../types'
import { isSamePoints } from './isSamePoints'

describe('isSamePoints: ', () => {
  it('should return true if start point, end point are the same', () => {
    const MOCK_POINTS: [Point, Point] = [
      [10, 10],
      [10, 10],
    ]

    expect(isSamePoints(MOCK_POINTS)).toEqual(true)
  })

  it('should return false if points length is more than munimum points length', () => {
    const MOCK_POINTS: [Point, Point] = [
      [0, 0],
      [10, 10],
    ]

    expect(isSamePoints(MOCK_POINTS)).toEqual(false)
  })
})
