import type { Point, TextAnnotation, LineAnnotation, PolygonAnnotation, FreeLineAnnotation } from '../../../types'

import { INITIAL_TEXT } from '../../../mocks/text'
import { INITIAL_LINE } from '../../../mocks/lines'
import { INITIAL_POLYGON } from '../../../mocks/polygons'
import { INITIAL_FREE_LINE } from '../../../mocks/freeLines'

import { getDrawingAnnotation } from './getDrawingAnnotation'

describe('getDrawingAnnotation', () => {
  it('test line, text annotation', () => {
    const MOCK_CURRENT_POINTS: [Point, Point] = [
      [0, 1],
      [2, 3],
    ]
    const MOCK_CURRENT_TEXT_LABEL_POSITION: [number, number] = [0, 1]
    const MOCK_CURRENT_LINE_LABEL_POSITION: [number, number] = [-2, -4]

    const LINE_ANNOTATION_RESULT = getDrawingAnnotation({
      currentPoints: MOCK_CURRENT_POINTS,
      prevAnnotation: INITIAL_LINE,
    })
    const TEXT_ANNOTATION_RESULT = getDrawingAnnotation({
      currentPoints: MOCK_CURRENT_POINTS,
      prevAnnotation: INITIAL_TEXT,
    })

    const MOCK_DRAWING_LINE_ANNOTATION: LineAnnotation = {
      ...INITIAL_LINE,
      points: MOCK_CURRENT_POINTS,
      labelPosition: MOCK_CURRENT_LINE_LABEL_POSITION,
    }
    const MOCK_DRAWING_TEXT_ANNOTATION: TextAnnotation = {
      ...INITIAL_TEXT,
      points: MOCK_CURRENT_POINTS,
      labelPosition: MOCK_CURRENT_TEXT_LABEL_POSITION,
    }

    expect(LINE_ANNOTATION_RESULT).toStrictEqual(MOCK_DRAWING_LINE_ANNOTATION)
    expect(TEXT_ANNOTATION_RESULT).toStrictEqual(MOCK_DRAWING_TEXT_ANNOTATION)
  })
  it('test polygon, freeline annotation', () => {
    const MOCK_CURRENT_POINTS: Point[] = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ]

    const POLYGON_ANNOTATION_RESULT = getDrawingAnnotation({
      currentPoints: MOCK_CURRENT_POINTS,
      prevAnnotation: INITIAL_POLYGON,
    })
    const FREE_LINE_ANNOTATION_RESULT = getDrawingAnnotation({
      currentPoints: MOCK_CURRENT_POINTS,
      prevAnnotation: INITIAL_FREE_LINE,
    })

    const MOCK_DRAWING_POLYGON_ANNOTATION: PolygonAnnotation = {
      ...INITIAL_POLYGON,
      points: MOCK_CURRENT_POINTS,
      labelPosition: POLYGON_ANNOTATION_RESULT.labelPosition,
    }
    const MOCK_DRAWING_POLYGON_FREE_LINE: FreeLineAnnotation = {
      ...INITIAL_FREE_LINE,
      points: MOCK_CURRENT_POINTS,
      labelPosition: FREE_LINE_ANNOTATION_RESULT.labelPosition,
    }

    expect(POLYGON_ANNOTATION_RESULT).toMatchObject(MOCK_DRAWING_POLYGON_ANNOTATION)
    expect(FREE_LINE_ANNOTATION_RESULT).toMatchObject(MOCK_DRAWING_POLYGON_FREE_LINE)
  })
})
