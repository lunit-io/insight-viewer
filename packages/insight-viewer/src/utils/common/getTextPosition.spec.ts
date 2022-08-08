import { Measurement, Point } from '../../types'
import { getTextPosition } from './getTextPosition'

describe('getTextPosition: ', () => {
  it('should return null when whole params are nullish', () => {
    expect(getTextPosition(null)).toEqual(null)
  })
  it('should return null when only measurement is exist', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
      id: 1,
      center: [0, 0],
      lineWidth: 1.5,
      radius: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      id: 2,
      length: 8.48528137423857,
      lineWidth: 1.5,
      points: [
        [0, 0],
        [10, 10],
      ],
      textPoint: [50, 50],
      type: 'ruler',
      unit: 'mm',
    }
    const MOCK_MEASUREMENT_3: Measurement = {
      center: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      textPoint: [40, 10],
      type: 'circle',
      unit: 'px',
    }

    expect(getTextPosition(MOCK_MEASUREMENT_1)).toEqual(null)
    expect(getTextPosition(MOCK_MEASUREMENT_2)).toEqual([50, 50])
    expect(getTextPosition(MOCK_MEASUREMENT_3)).toEqual([40, 10])
  })
  it('should return the correct point when edit mode is textMove and currentPosition is exist', () => {
    const MOCK_MEASUREMENT: Measurement = {
      center: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    const MOCK_CURRENT_POINT_1: Point = [29, 12]
    const MOCK_CURRENT_POINT_2: Point = [439, 112]
    const MOCK_CURRENT_POINT_3: Point = [62, 232]

    expect(getTextPosition(MOCK_MEASUREMENT, 'textMove', MOCK_CURRENT_POINT_1)).toEqual([29, 12])
    expect(getTextPosition(MOCK_MEASUREMENT, 'textMove', MOCK_CURRENT_POINT_2)).toEqual([439, 112])
    expect(getTextPosition(MOCK_MEASUREMENT, 'textMove', MOCK_CURRENT_POINT_3)).toEqual([62, 232])
  })
})
