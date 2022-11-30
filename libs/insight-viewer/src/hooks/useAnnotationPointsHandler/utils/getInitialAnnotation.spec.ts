import type { Point } from '../../../types'
import { getInitialAnnotation } from './getInitialAnnotation'

import { INITIAL_TEXT } from '../../../mocks/text'
import { INITIAL_LINE } from '../../../mocks/lines'
import { INITIAL_FREE_LINE } from '../../../mocks/freeLines'
import { INITIAL_POLYGON, ID3_INITIAL_POLYGON, MOCK_POLYGON_LIST } from '../../../mocks/polygons'

describe('getInitialAnnotation', () => {
  const MOCK_CURRENT_POINTS: [Point, Point] = [
    [1, 0],
    [1, 0],
  ]

  it('When the length of annotations is 0, test initial polygon annotation', () => {
    expect(
      getInitialAnnotation({
        image: null,
        annotations: [],
        mode: 'polygon',
        lineHead: 'normal',
        currentPoints: MOCK_CURRENT_POINTS,
      })
    ).toStrictEqual(INITIAL_POLYGON)
  })
  it('When the length of annotations is 2, test initial polygon annotation this is must be 3', () => {
    expect(
      getInitialAnnotation({
        image: null,
        mode: 'polygon',
        lineHead: 'normal',
        annotations: MOCK_POLYGON_LIST,
        currentPoints: MOCK_CURRENT_POINTS,
      })
    ).toStrictEqual(ID3_INITIAL_POLYGON)
  })
  it('test initial line annotation', () => {
    expect(
      getInitialAnnotation({
        image: null,
        annotations: [],
        mode: 'line',
        lineHead: 'normal',
        currentPoints: MOCK_CURRENT_POINTS,
      })
    ).toStrictEqual(INITIAL_LINE)
  })
  it('test initial free line annotation', () => {
    expect(
      getInitialAnnotation({
        image: null,
        annotations: [],
        mode: 'freeLine',
        lineHead: 'normal',
        currentPoints: MOCK_CURRENT_POINTS,
      })
    ).toStrictEqual(INITIAL_FREE_LINE)
  })
  it('test initial text annotation', () => {
    expect(
      getInitialAnnotation({
        image: null,
        annotations: [],
        mode: 'text',
        lineHead: 'normal',
        currentPoints: MOCK_CURRENT_POINTS,
      })
    ).toStrictEqual(INITIAL_TEXT)
  })
})
