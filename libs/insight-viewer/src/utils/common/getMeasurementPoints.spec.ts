import { getMeasurementPoints } from './getMeasurementPoints'

import type { Measurement, Point } from '../../types'

describe('getMeasurementPoints: ', () => {
  it('should return correct point with getMeasurementEditingPoints', () => {
    const EDITING_MODE_ON = true
    const MOCK_SELECTED_RULER_MEASUREMENT: Measurement = {
      id: 1,
      measuredValue: 14.142135623730951,
      lineWidth: 1.5,
      startAndEndPoint: [
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

    expect(
      getMeasurementPoints({
        mode: 'ruler',
        isEditing: EDITING_MODE_ON,
        prevPoints: MOCK_PREV_POINTS,
        editMode: 'startPoint',
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
    const EDITING_MODE_OFF = false
    const MOCK_SELECTED_RULER_MEASUREMENT: Measurement = {
      id: 1,
      measuredValue: 14.142135623730951,
      lineWidth: 1.5,
      startAndEndPoint: [
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

    expect(
      getMeasurementPoints({
        mode: 'ruler',
        isEditing: EDITING_MODE_OFF,
        prevPoints: MOCK_PREV_POINTS,
        editMode: 'startPoint',
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
