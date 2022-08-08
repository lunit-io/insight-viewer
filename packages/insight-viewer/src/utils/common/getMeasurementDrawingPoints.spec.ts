import { Point } from '../../types'
import { getMeasurementDrawingPoints } from './getMeasurementDrawingPoints'

describe('getMeasurementDrawingPoints: ', () => {
  it('should return points in ruler mode', () => {
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

    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, 'ruler')).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, 'ruler')).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, 'ruler')).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
  it('should return the points in circle mode', () => {
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

    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, 'circle')).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, 'circle')).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(getMeasurementDrawingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, 'circle')).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
})
