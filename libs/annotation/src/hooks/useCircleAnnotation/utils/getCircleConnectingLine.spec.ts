import type { Point } from '../../../types'
import { getCircleConnectingLine } from './getCircleConnectingLine'

describe('getCircleConnectingLine', () => {
  it('should return the points', () => {
    const MOCK_POINTS_1: [Point, Point] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_TEXT_POINT_1: Point = [20, 20]
    const MOCK_POINTS_2: [Point, Point] = [
      [10, 10],
      [30, 30],
    ]
    const MOCK_TEXT_POINT_2: Point = [50, 50]
    const MOCK_POINTS_3: [Point, Point] = [
      [20, 20],
      [40, 40],
    ]
    const MOCK_TEXT_POINT_3: Point = [20, 20]

    expect(getCircleConnectingLine(MOCK_POINTS_1, MOCK_TEXT_POINT_1)).toEqual([
      [10.000000000000002, 10],
      [20, 20],
    ])
    expect(getCircleConnectingLine(MOCK_POINTS_2, MOCK_TEXT_POINT_2)).toEqual([
      [30.000000000000004, 30],
      [50, 50],
    ])
    expect(getCircleConnectingLine(MOCK_POINTS_3, MOCK_TEXT_POINT_3)).toEqual([
      [0, 40],
      [20, 20],
    ])
  })
})
