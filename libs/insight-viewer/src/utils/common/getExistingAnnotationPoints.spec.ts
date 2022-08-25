import { getExistingAnnotationPoints } from './getExistingAnnotationPoints'

import { INITIAL_TEXT } from '../../mocks/text'
import { INITIAL_LINE } from '../../mocks/lines'
import { INITIAL_POLYGON } from '../../mocks/polygons'
import { INITIAL_FREE_LINE } from '../../mocks/freeLines'

describe('getExistingAnnotationPoints', () => {
  it('test polygon, line, freeline, text annotation', () => {
    expect(getExistingAnnotationPoints(INITIAL_POLYGON, null)).toStrictEqual(INITIAL_POLYGON.points)
    expect(getExistingAnnotationPoints(INITIAL_LINE, null)).toStrictEqual(INITIAL_LINE.points)
    expect(getExistingAnnotationPoints(INITIAL_FREE_LINE, null)).toStrictEqual(INITIAL_FREE_LINE.points)
    expect(getExistingAnnotationPoints(INITIAL_TEXT, null)).toStrictEqual(INITIAL_TEXT.points)
  })
})
