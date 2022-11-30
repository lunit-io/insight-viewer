import { getAnnotationDrawingPoints } from './getAnnotationDrawingPoints'
import { Point } from '../../../types'
import { MOCK_POLYGON_LIST } from '../../../mocks/polygons'

describe('getAnnotationDrawingPoints:', () => {
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

  it('should return points in polygon mode', () => {
    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, 'polygon')).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, 'polygon')).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POLYGON, MOCK_POINT_3, 'polygon')).toEqual([...MOCK_POLYGON, MOCK_POINT_3])
  })
  it('should return points in free line mode', () => {
    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, 'freeLine')).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, 'freeLine')).toEqual([
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
      [30, 30],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POLYGON, MOCK_POINT_3, 'freeLine')).toEqual([...MOCK_POLYGON, MOCK_POINT_3])
  })
  it('should return points in line mode', () => {
    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, 'line')).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, 'line')).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('should return points in text mode', () => {
    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, 'text')).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, 'text')).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
  it('should return points in circle mode', () => {
    expect(getAnnotationDrawingPoints(MOCK_POINTS_1, MOCK_POINT_1, 'circle')).toEqual([
      [10, 10],
      [20, 20],
    ])
    expect(getAnnotationDrawingPoints(MOCK_POINTS_2, MOCK_POINT_2, 'circle')).toEqual([
      [10, 10],
      [30, 30],
    ])
  })
})
