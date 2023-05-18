import type { Point } from '../../../types'
import { getRulerConnectingLine } from './getRulerConnectingLine'

describe('getConnectingLinePoints: ', () => {
  it('should return the points', () => {
    const MOCK_POINTS_1: [Point, Point] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINTS_2: [Point, Point] = [
      [30, 30],
      [50, 50],
    ]
    const MOCK_POINTS_3: [Point, Point] = [
      [321, 120],
      [90, 333],
    ]

    const MOCK_TEXT_POINT_1: Point = [32, 12]
    const MOCK_TEXT_POINT_2: Point = [232, 102]
    const MOCK_TEXT_POINT_3: Point = [142, 524]

    expect(getRulerConnectingLine(MOCK_POINTS_1, MOCK_TEXT_POINT_1)).toEqual([
      [10, 10],
      [32, 12],
    ])
    expect(getRulerConnectingLine(MOCK_POINTS_2, MOCK_TEXT_POINT_2)).toEqual([
      [50, 50],
      [232, 102],
    ])
    expect(getRulerConnectingLine(MOCK_POINTS_3, MOCK_TEXT_POINT_3)).toEqual([
      [90, 333],
      [142, 524],
    ])
  })
})
