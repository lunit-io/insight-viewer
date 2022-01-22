import { getIsComplexPolygon } from './getIsComplexPolygon'
import { ID1_CONTOUR, ID2_CONTOUR, COMPLEX_POLYGON } from '../../mocks/contours'

describe('getIsComplexPolygon:', () => {
  it('the id 1 contour polygon shouldn`t be complex', () => {
    expect(getIsComplexPolygon(ID1_CONTOUR.polygon)).toBeFalsy()
  })
  it('the id 2 contour polygon shouldn`t be complex', () => {
    expect(getIsComplexPolygon(ID2_CONTOUR.polygon)).toBeFalsy()
  })
  it('the polygon should be complex', () => {
    expect(getIsComplexPolygon(COMPLEX_POLYGON)).toBeTruthy()
  })
})
