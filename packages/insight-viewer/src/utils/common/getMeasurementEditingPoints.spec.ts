import { Point } from '../../types'
import { getMeasurementEditingPoints } from './getMeasurementEditingPoints'

describe('getMeasurementEditingPoints: ', () => {
  const MOCK_PREV_POINT_1: [Point, Point] = [
    [0, 0],
    [10, 10],
  ]
  const MOCK_PREV_POINT_2: [Point, Point] = [
    [10, 20],
    [30, 40],
  ]
  const MOCK_PREV_POINT_3: [Point, Point] = [
    [40, 60],
    [80, 100],
  ]

  const MOCK_CURRENT_POINT_1: Point = [5, 5]
  const MOCK_CURRENT_POINT_2: Point = [15, 15]
  const MOCK_CURRENT_POINT_3: Point = [25, 25]

  const MOCK_EDIT_POINT_1: Point = [30, 30]
  const MOCK_EDIT_POINT_2: Point = [50, 60]
  const MOCK_EDIT_POINT_3: Point = [70, 90]

  const START_POINT_MODE = 'startPoint'
  const END_POINT_MODE = 'endPoint'
  const MOVE_MODE = 'move'
  const RULER_MODE = 'ruler'
  const CIRCLE_MODE = 'circle'

  it('should return correct points when edit mode is startPoint and measurement mode is ruler', () => {
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_1,
        MOCK_CURRENT_POINT_1,
        MOCK_EDIT_POINT_1,
        START_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [5, 5],
      [10, 10],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_2,
        MOCK_CURRENT_POINT_2,
        MOCK_EDIT_POINT_2,
        START_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [15, 15],
      [30, 40],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_3,
        MOCK_CURRENT_POINT_3,
        MOCK_EDIT_POINT_3,
        START_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [25, 25],
      [80, 100],
    ])
  })
  it('should return correct points when edit mode is endPoint and measurement mode is ruler', () => {
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_1,
        MOCK_CURRENT_POINT_1,
        MOCK_EDIT_POINT_1,
        END_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_2,
        MOCK_CURRENT_POINT_2,
        MOCK_EDIT_POINT_2,
        END_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_3,
        MOCK_CURRENT_POINT_3,
        MOCK_EDIT_POINT_3,
        END_POINT_MODE,
        RULER_MODE
      )
    ).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
  it('should return correct points when edit mode is startPoint and measurement mode is circle', () => {
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_1,
        MOCK_CURRENT_POINT_1,
        MOCK_EDIT_POINT_1,
        START_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_2,
        MOCK_CURRENT_POINT_2,
        MOCK_EDIT_POINT_2,
        START_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_3,
        MOCK_CURRENT_POINT_3,
        MOCK_EDIT_POINT_3,
        START_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [40, 60],
      [25, 25],
    ])
  })
  it('should return correct points when edit mode is endPoint and measurement mode is circle', () => {
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_1,
        MOCK_CURRENT_POINT_1,
        MOCK_EDIT_POINT_1,
        END_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [0, 0],
      [5, 5],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_2,
        MOCK_CURRENT_POINT_2,
        MOCK_EDIT_POINT_2,
        END_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [10, 20],
      [15, 15],
    ])
    expect(
      getMeasurementEditingPoints(
        MOCK_PREV_POINT_3,
        MOCK_CURRENT_POINT_3,
        MOCK_EDIT_POINT_3,
        END_POINT_MODE,
        CIRCLE_MODE
      )
    ).toEqual([
      [40, 60],
      [25, 25],
    ])
  })

  it('should return correct points when edit mode is move and measurement mode is ruler or circle', () => {
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, MOCK_EDIT_POINT_1, MOVE_MODE, RULER_MODE)
    ).toEqual([
      [-25, -25],
      [-15, -15],
    ])
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, MOCK_EDIT_POINT_2, MOVE_MODE, RULER_MODE)
    ).toEqual([
      [-25, -25],
      [-5, -5],
    ])
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, MOCK_EDIT_POINT_3, MOVE_MODE, RULER_MODE)
    ).toEqual([
      [-5, -5],
      [35, 35],
    ])
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_1, MOCK_CURRENT_POINT_1, MOCK_EDIT_POINT_1, MOVE_MODE, CIRCLE_MODE)
    ).toEqual([
      [-25, -25],
      [-15, -15],
    ])
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_2, MOCK_CURRENT_POINT_2, MOCK_EDIT_POINT_2, MOVE_MODE, CIRCLE_MODE)
    ).toEqual([
      [-25, -25],
      [-5, -5],
    ])
    expect(
      getMeasurementEditingPoints(MOCK_PREV_POINT_3, MOCK_CURRENT_POINT_3, MOCK_EDIT_POINT_3, MOVE_MODE, CIRCLE_MODE)
    ).toEqual([
      [-5, -5],
      [35, 35],
    ])
  })
})
