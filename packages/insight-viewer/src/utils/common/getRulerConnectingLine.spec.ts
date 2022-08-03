import { Point } from '../../types'
import { getRulerConnectingLine } from './getRulerConnectingLine'

describe('getRulerConnectingLine: ', () => {
  it('should return the correct points', () => {
    const MOCK_LINE_1: [Point, Point] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_LINE_2: [Point, Point] = [
      [30, 30],
      [50, 50],
    ]
    const MOCK_LINE_3: [Point, Point] = [
      [321, 120],
      [90, 333],
    ]

    const MOCK_TEXT_POINT_1: Point = [32, 12]
    const MOCK_TEXT_POINT_2: Point = [232, 102]
    const MOCK_TEXT_POINT_3: Point = [142, 524]

    expect(getRulerConnectingLine(MOCK_LINE_1, MOCK_TEXT_POINT_1)).toEqual([
      [10, 10],
      [32, 12],
    ])
    expect(getRulerConnectingLine(MOCK_LINE_2, MOCK_TEXT_POINT_2)).toEqual([
      [50, 50],
      [232, 102],
    ])
    expect(getRulerConnectingLine(MOCK_LINE_3, MOCK_TEXT_POINT_3)).toEqual([
      [321, 120],
      [142, 524],
    ])
  })
})
