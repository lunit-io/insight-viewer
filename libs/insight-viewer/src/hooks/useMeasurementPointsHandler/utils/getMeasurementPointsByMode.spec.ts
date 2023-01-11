import { getMeasurementPointsByMode } from './getMeasurementPointsByMode'

import type { Point } from '../../../types'

describe('getMeasurementPointsByMode: ', () => {
  const DRAWING_MODE_AREA = 'area'
  const DRAWING_MODE_RULER = 'ruler'

  const MOCK_PREV_POINTS_1: [centerPoint: Point, endPoint: Point] = [
    [0, 0],
    [10, 10],
  ]
  const MOCK_PREV_POINTS_2: [centerPoint: Point, endPoint: Point] = [
    [13, 15],
    [1000, 7],
  ]
  const MOCK_MOUSE_MOVE_POINT_1: Point = [300, 210]
  const MOCK_MOUSE_MOVE_POINT_2: Point = [123089, 29]

  it('should return the mouse-down and mouse-move points when drawing mode is area and mouse-down point is not null', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [10000, 10000]

    const MOCK_EXPECT_RESULT_1: [Point, Point] = [
      [0, 0],
      [300, 210],
    ]
    const MOCK_EXPECT_RESULT_2: [Point, Point] = [
      [10000, 10000],
      [123089, 29],
    ]

    expect(
      getMeasurementPointsByMode(
        false,
        null,
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT_1,
        MOCK_MOUSE_MOVE_POINT_1,
        MOCK_PREV_POINTS_1
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_1)

    expect(
      getMeasurementPointsByMode(
        false,
        null,
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT_2,
        MOCK_MOUSE_MOVE_POINT_2,
        MOCK_PREV_POINTS_2
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_2)
  })

  it('should return the current start and end points when when isEditing is true and editMode is textMove or move of area', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2 = null

    const MOCK_EXPECT_RESULT_1: [Point, Point] = [
      [-14.142135623730951, 0],
      [10, 10],
    ]
    const MOCK_EXPECT_RESULT_2: [Point, Point] = [
      [-974.0324209467489, 15],
      [1000, 7],
    ]

    expect(
      getMeasurementPointsByMode(
        true,
        'move',
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT_1,
        MOCK_MOUSE_MOVE_POINT_1,
        MOCK_PREV_POINTS_1
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_1)

    expect(
      getMeasurementPointsByMode(
        true,
        'textMove',
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT_2,
        MOCK_MOUSE_MOVE_POINT_2,
        MOCK_PREV_POINTS_2
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_2)
  })

  it('should return previous points when mouse-down points of area is null', () => {
    const MOCK_MOUSE_DOWN_POINT = null

    const MOCK_EXPECT_RESULT_1 = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_EXPECT_RESULT_2 = [
      [13, 15],
      [1000, 7],
    ]

    expect(
      getMeasurementPointsByMode(
        true,
        null,
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT,
        MOCK_MOUSE_MOVE_POINT_1,
        MOCK_PREV_POINTS_1
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_1)

    expect(
      getMeasurementPointsByMode(
        false,
        null,
        DRAWING_MODE_AREA,
        MOCK_MOUSE_DOWN_POINT,
        MOCK_MOUSE_MOVE_POINT_2,
        MOCK_PREV_POINTS_2
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_2)
  })

  it('should return previous points when drawing mode is ruler', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [10000, 10000]

    const MOCK_EXPECT_RESULT_1 = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_EXPECT_RESULT_2 = [
      [13, 15],
      [1000, 7],
    ]

    expect(
      getMeasurementPointsByMode(
        true,
        'endPoint',
        DRAWING_MODE_RULER,
        MOCK_MOUSE_DOWN_POINT_1,
        MOCK_MOUSE_MOVE_POINT_1,
        MOCK_PREV_POINTS_1
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_1)

    expect(
      getMeasurementPointsByMode(
        false,
        null,
        DRAWING_MODE_RULER,
        MOCK_MOUSE_DOWN_POINT_2,
        MOCK_MOUSE_MOVE_POINT_2,
        MOCK_PREV_POINTS_2
      )
    ).toStrictEqual(MOCK_EXPECT_RESULT_2)
  })
})
