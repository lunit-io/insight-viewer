import { Measurement, Point } from '../../types'
import { getMeasurementPoints } from './getMeasurementPoints'

describe('getMeasurementPoints: ', () => {
  const RULER_MODE = 'ruler'
  const EDITING_MODE_ON = true
  const EDITING_MODE_OFF = false
  const START_POINT_MODE = 'startPoint'

  const MOCK_SELECTED_RULER_MEASUREMENT: Measurement = {
    id: 1,
    length: 14.142135623730951,
    lineWidth: 1.5,
    points: [
      [0, 0],
      [10, 10],
    ],
    textPoint: null,
    type: 'ruler',
    unit: 'px',
  }

  const MOCK_PREV_POINTS: [Point, Point] = [
    [0, 0],
    [10, 20],
  ]

  const MOCK_CURRENT_POINT: Point = [5, 5]

  const MOCK_EDIT_POINT: Point = [30, 30]
  it('should return correct point with getMeasurementEditingPoints', () => {
    expect(
      getMeasurementPoints({
        mode: RULER_MODE,
        isEditing: EDITING_MODE_ON,
        prevPoints: MOCK_PREV_POINTS,
        editMode: START_POINT_MODE,
        point: MOCK_CURRENT_POINT,
        editStartPoint: MOCK_EDIT_POINT,
        selectedMeasurement: MOCK_SELECTED_RULER_MEASUREMENT,
      })
    ).toStrictEqual([
      [5, 5],
      [10, 20],
    ])
  })
  it('should return correct point with getMeasurementDrawingPoints', () => {
    expect(
      getMeasurementPoints({
        mode: RULER_MODE,
        isEditing: EDITING_MODE_OFF,
        prevPoints: MOCK_PREV_POINTS,
        editMode: START_POINT_MODE,
        point: MOCK_CURRENT_POINT,
        editStartPoint: MOCK_EDIT_POINT,
        selectedMeasurement: MOCK_SELECTED_RULER_MEASUREMENT,
      })
    ).toStrictEqual([
      [0, 0],
      [5, 5],
    ])
  })
})
