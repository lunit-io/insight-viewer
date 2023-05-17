import type { Point } from '../types'
import { getMovedPoints } from './getMovedPoints'

describe('getMovedPoints: ', () => {
  it('should return the points moved points', () => {
    const MOCK_PREV_POINT_1: [Point, Point] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_PREV_POINT_2: [Point, Point] = [
      [10, 20],
      [30, 40],
    ]
    const MOCK_PREV_POINT_3: [Point, Point] = [
      [40, 60],
      [80, 100],
    ]
    const MOCK_CURRENT_POINT_1: Point = [5, 5]
    const MOCK_CURRENT_POINT_2: Point = [15, 15]
    const MOCK_CURRENT_POINT_3: Point = [25, 25]
    const MOCK_EDIT_POINT_1: Point = [30, 30]
    const MOCK_EDIT_POINT_2: Point = [50, 60]
    const MOCK_EDIT_POINT_3: Point = [70, 90]

    expect(
      getMovedPoints({
        prevPoints: MOCK_PREV_POINT_1,
        currentPoint: MOCK_CURRENT_POINT_1,
        editStartPoint: MOCK_EDIT_POINT_1,
      })
    ).toEqual([
      [-25, -25],
      [-15, -15],
    ])
    expect(
      getMovedPoints({
        prevPoints: MOCK_PREV_POINT_2,
        currentPoint: MOCK_CURRENT_POINT_2,
        editStartPoint: MOCK_EDIT_POINT_2,
      })
    ).toEqual([
      [-25, -25],
      [-5, -5],
    ])
    expect(
      getMovedPoints({
        prevPoints: MOCK_PREV_POINT_3,
        currentPoint: MOCK_CURRENT_POINT_3,
        editStartPoint: MOCK_EDIT_POINT_3,
      })
    ).toEqual([
      [-5, -5],
      [35, 35],
    ])
  })
})
