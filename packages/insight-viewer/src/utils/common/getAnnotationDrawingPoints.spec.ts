import { getAnnotationDrawingPoints } from './getAnnotationDrawingPoints'
import { Point } from '../../types'

describe('getAnnotationDrawingPoints:', () => {
  it('the point should be updated in polygon mode', () => {
    const MODE = 'polygon'

    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, MODE)).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
  })
  it('the point should be updated in free line mode', () => {
    const MODE = 'freeLine'

    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, MODE)).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
  })
  it('the point should be updated in line mode', () => {
    const MODE = 'line'

    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('the point should be updated in text mode', () => {
    const MODE = 'text'

    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('the point should be updated in circle mode', () => {
    const MODE = 'circle'

    const MOCK_POINTS_1: Point[] = [[10, 10]]
    const MOCK_POINTS_2: Point[] = [
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_POINT_1: Point = [20, 20]
    const MOCK_POINT_2: Point = [30, 30]

    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, MODE)).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, MODE)).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
})
