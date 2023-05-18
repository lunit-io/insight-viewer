import { validateAnnotation } from './validateAnnotation'
import { COMPLEX_POLYGON, INITIAL_POLYGON, ID2_POLYGON } from '../../../mocks/polygons'
import { INITIAL_LINE } from '../../../mocks/lines'
import { INITIAL_AREA } from '../../../mocks/area'

describe('validateAnnotation:', () => {
  it('if it is an complex polygon, it should return null', () => {
    expect(validateAnnotation(COMPLEX_POLYGON)).toBeNull()
  })
  it('if polygon points is 5 or less, it returns null', () => {
    expect(validateAnnotation(INITIAL_POLYGON)).toBeNull()
  })
  it('if it is a line and the points are the same, it should return null', () => {
    expect(validateAnnotation(INITIAL_LINE)).toBeNull()
  })
  it('if it is an area and the radius is 0, it should return null', () => {
    expect(validateAnnotation(INITIAL_AREA)).toBeNull()
  })
  it('returns an annotation when a normal annotation is inserted.', () => {
    expect(validateAnnotation(ID2_POLYGON)).toBe(ID2_POLYGON)
  })
})
