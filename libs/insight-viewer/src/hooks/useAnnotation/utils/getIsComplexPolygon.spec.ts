import { getIsComplexPolygon } from './getIsComplexPolygon'
import { ID1_POLYGON, ID2_POLYGON, COMPLEX_POLYGON } from '../../../mocks/polygons'

describe('getIsComplexPolygon:', () => {
  it('the id 1 contour polygon shouldn`t be complex', () => {
    expect(getIsComplexPolygon(ID1_POLYGON.points)).toBeFalsy()
  })
  it('the id 2 contour polygon shouldn`t be complex', () => {
    expect(getIsComplexPolygon(ID2_POLYGON.points)).toBeFalsy()
  })
  it('the polygon should be complex', () => {
    expect(getIsComplexPolygon(COMPLEX_POLYGON.points)).toBeTruthy()
  })
})
