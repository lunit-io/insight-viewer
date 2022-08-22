import type { Point, LineAnnotation, TextAnnotation, PolygonAnnotation, FreeLineAnnotation } from '../../types'

import { INITIAL_TEXT } from '../../mocks/text'
import { INITIAL_LINE } from '../../mocks/lines'
import { INITIAL_POLYGON } from '../../mocks/polygons'
import { INITIAL_FREE_LINE } from '../../mocks/freeLines'

import { getDrawingAnnotation } from './getDrawingAnnotation'

describe('getDrawingAnnotation', () => {
  it('test line, text annotation', () => {
    const MOCK_CURRENT_POINTS: [Point, Point] = [
      [0, 1],
      [2, 3],
    ]

    const MOCK_DRAWING_LINE_ANNOTATION: LineAnnotation = { ...INITIAL_LINE, points: MOCK_CURRENT_POINTS }
    const MOCK_DRAWING_TEXT_ANNOTATION: TextAnnotation = { ...INITIAL_TEXT, points: MOCK_CURRENT_POINTS }

    expect(getDrawingAnnotation({ currentPoints: MOCK_CURRENT_POINTS, prevAnnotation: INITIAL_LINE })).toStrictEqual(
      MOCK_DRAWING_LINE_ANNOTATION
    )
    expect(getDrawingAnnotation({ currentPoints: MOCK_CURRENT_POINTS, prevAnnotation: INITIAL_TEXT })).toStrictEqual(
      MOCK_DRAWING_TEXT_ANNOTATION
    )
  })
  it('test polygon, freeline annotation', () => {
    const MOCK_CURRENT_POINTS: Point[] = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ]

    const MOCK_DRAWING_POLYGON_ANNOTATION: PolygonAnnotation = { ...INITIAL_POLYGON, points: MOCK_CURRENT_POINTS }
    const MOCK_DRAWING_POLYGON_FREE_LINE: FreeLineAnnotation = { ...INITIAL_FREE_LINE, points: MOCK_CURRENT_POINTS }

    expect(getDrawingAnnotation({ currentPoints: MOCK_CURRENT_POINTS, prevAnnotation: INITIAL_POLYGON })).toStrictEqual(
      MOCK_DRAWING_POLYGON_ANNOTATION
    )
    expect(
      getDrawingAnnotation({ currentPoints: MOCK_CURRENT_POINTS, prevAnnotation: INITIAL_FREE_LINE })
    ).toStrictEqual(MOCK_DRAWING_POLYGON_FREE_LINE)
  })
})
