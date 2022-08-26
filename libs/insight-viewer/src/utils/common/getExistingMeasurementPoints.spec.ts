import { Measurement } from '../../types'
import { Image } from '../../Viewer/types'
import { getExistingMeasurementPoints } from './getExistingMeasurementPoints'

describe('getExistingMeasurementPoints: ', () => {
  it('should return the points without Image', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      calculatedPixelValueByUnit: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      centerPoint: [10, 20],
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      calculatedPixelValueByUnit: 30,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_1, null)).toEqual([
      [0, 0],
      [20, 0],
    ])
    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_2, null)).toEqual([
      [10, 20],
      [40, 20],
    ])
  })

  it('should return the points with Image', () => {
    const MOCK_IMAGE = { columnPixelSpacing: 0.6, rowPixelSpacing: 0.6 } as Image
    const MOCK_MEASUREMENT_1: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      calculatedPixelValueByUnit: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      centerPoint: [10, 20],
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      calculatedPixelValueByUnit: 30,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_1, MOCK_IMAGE)).toEqual([
      [0, 0],
      [33.333333333333336, 0],
    ])
    expect(getExistingMeasurementPoints(MOCK_MEASUREMENT_2, MOCK_IMAGE)).toEqual([
      [10, 20],
      [60, 20],
    ])
  })
})
