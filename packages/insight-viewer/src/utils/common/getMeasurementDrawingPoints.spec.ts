import { Point } from '../../types'
import { getMeasurementDrawingPoints } from './getMeasurementDrawingPoints'

describe('getMeasurementDrawingPoints: ', () => {
  it('should return correct points ruler mode', () => {
    const RULER_MODE = 'ruler'
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

    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, RULER_MODE)).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, RULER_MODE)).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, RULER_MODE)).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
  it('should return correct points circle mode', () => {
    const CIRCLE_MODE = 'circle'
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

    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, CIRCLE_MODE)).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, CIRCLE_MODE)).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, CIRCLE_MODE)).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
})
