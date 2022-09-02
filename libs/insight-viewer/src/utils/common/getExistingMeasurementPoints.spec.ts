import { getExistingMeasurementPoints } from './getExistingMeasurementPoints'

import type { Measurement } from '../../types'

describe('getExistingMeasurementPoints: ', () => {
  it('should return the points without Image', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      measuredValue: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      centerPoint: [10, 20],
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      measuredValue: 30,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_1)).toEqual([
      [0, 0],
      [20, 0],
    ])
    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_2)).toEqual([
      [10, 20],
      [40, 20],
    ])
  })

  it('should return the points with Image', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      measuredValue: 20,
      textPoint: null,
      type: 'circle',
      unit: 'mm',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      centerPoint: [10, 20],
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      measuredValue: 30,
      textPoint: null,
      type: 'circle',
      unit: 'mm',
    }

    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_1)).toEqual([
      [0, 0],
      [20, 0],
    ])
    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_2)).toEqual([
      [10, 20],
      [40, 20],
    ])
  })
})
