import { CIRCLE_MODE, FREE_LINE_MODE, LINE_MODE, POLYGON_MODE, TEXT_MODE } from '../../mocks/const'
import { getAnnotationDrawingPoints } from './getAnnotationDrawingPoints'
import { Point } from '../../types'
import { MOCK_POLYGON_LIST } from '../../mocks/polygons'

describe('getAnnotationDrawingPoints:', () => {
  it('should return points in polygon mode', () => {
    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POLYGON = MOCK_POLYGON_LIST[0].points
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]
    const MOCK_POINT_3: Point = [100, 100]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, POLYGON_MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, POLYGON_MODE)).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POLYGON, MOCK_POINT_3, POLYGON_MODE)).toEqual([
      ...MOCK_POLYGON,
      MOCK_POINT_3,
    ])
  })
  it('should return points in free line mode', () => {
    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POLYGON = MOCK_POLYGON_LIST[0].points
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]
    const MOCK_POINT_3: Point = [100, 100]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, FREE_LINE_MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, FREE_LINE_MODE)).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POLYGON, MOCK_POINT_3, FREE_LINE_MODE)).toEqual([
      ...MOCK_POLYGON,
      MOCK_POINT_3,
    ])
  })
  it('should return points in line mode', () => {
    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]

    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, LINE_MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, LINE_MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('should return points in text mode', () => {
    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]

    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, TEXT_MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, TEXT_MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('should return points in circle mode', () => {
    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]

    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, CIRCLE_MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, CIRCLE_MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
})
