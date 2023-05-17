import { calculateLengthBetweenPoints } from './calculateLengthBetweenPoints'
import type { Point } from '../types'

describe('calculateLengthBetweenPoints: ', () => {
  it('should return the length', () => {
    const MOCK_POINT_1: [Point, Point] = [
      [29, 12],
      [31, 122],
    ]
    const MOCK_POINT_2: [Point, Point] = [
      [439, 112],
      [50, 12],
    ]
    const MOCK_POINT_3: [Point, Point] = [
      [62, 232],
      [100, 500],
    ]

    expect(calculateLengthBetweenPoints(MOCK_POINT_1[0], MOCK_POINT_1[1])).toEqual(110.01818031580054)
    expect(calculateLengthBetweenPoints(MOCK_POINT_2[0], MOCK_POINT_2[1])).toEqual(401.64785571443053)
    expect(calculateLengthBetweenPoints(MOCK_POINT_3[0], MOCK_POINT_3[1])).toEqual(270.6806236138819)
  })
})
