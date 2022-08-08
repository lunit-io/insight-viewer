import { getIsPolygonAreaGreaterThanArea } from './getIsPolygonAreaGreaterThanArea'
import { MOCK_POLYGON_LIST, ID1_POLYGON, ID2_POLYGON } from '../../mocks/polygons'
import { Point } from '../../types'

describe('getIsPolygonAreaGreaterThanArea: ', () => {
  const MOCK_POLYGON_POINTS_1: Point[] = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ]
  const MOCK_POLYGON_POINTS_2 = MOCK_POLYGON_LIST[0].points
  const MOCK_POLYGON_POINTS_3 = MOCK_POLYGON_LIST[1].points
  const MOCK_POLYGON_POINTS_4 = ID1_POLYGON.points
  const MOCK_POLYGON_POINTS_5 = ID2_POLYGON.points

  it('should check polygon area with default value', () => {
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_1)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_2)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_3)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_4)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_5)).toBeTruthy()
  })

  it('should check polygon area is bigger than 300', () => {
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_1, 300)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_2, 300)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_3, 300)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_4, 300)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_5, 300)).toBeTruthy()
  })

  it('should check polygon area is bigger than 600', () => {
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_1, 600)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_2, 600)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_3, 600)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_4, 600)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_5, 600)).toBeTruthy()
  })

  it('should check polygon area is bigger than 900', () => {
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_1, 900)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_2, 900)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_3, 900)).toBeTruthy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_4, 900)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_5, 900)).toBeTruthy()
  })

  it('should check polygon area is bigger than 1200', () => {
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_1, 1200)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_2, 1200)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_3, 1200)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_4, 1200)).toBeFalsy()
    expect(getIsPolygonAreaGreaterThanArea(MOCK_POLYGON_POINTS_5, 1200)).toBeFalsy()
  })
})
