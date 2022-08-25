import { checkIsInitialAnnotation } from './checkIsInitialAnnotation'

import { INITIAL_CIRCLE } from '../../mocks/circle'
import { ID1_POLYGON as DRAWING_POLYGON, INITIAL_POLYGON } from '../../mocks/polygons'

describe('checkIsInitialAnnotation:', () => {
  it('check if circle annotation is initial annotation', () => {
    expect(checkIsInitialAnnotation(INITIAL_CIRCLE)).toEqual(true)
  })
  it('check if annotation is initial polygon annotation', () => {
    expect(checkIsInitialAnnotation(INITIAL_POLYGON)).toEqual(true)
  })
  it('check if Annotation drawing annotation', () => {
    expect(checkIsInitialAnnotation(DRAWING_POLYGON)).toEqual(false)
  })
})
