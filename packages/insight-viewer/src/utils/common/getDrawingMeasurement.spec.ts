import { mockPixelToCanvas } from '../../mocks/utils'
import { Measurement, Point } from '../../types'
import { getDrawingMeasurement } from './getDrawingMeasurement'

describe('getDrawingMeasurement:', () => {
  it('should return the circle measurement', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
      center: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }
    const MOCK_MEASUREMENT_2: Measurement = {
      center: [10, 20],
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    const MOCK_POINT_1: [Point, Point] = [
      [42, 122],
      [51, 203],
    ]
    const MOCK_POINT_2: [Point, Point] = [
      [531, 231],
      [151, 333],
    ]

    expect(getDrawingMeasurement(MOCK_POINT_1, MOCK_MEASUREMENT_1, mockPixelToCanvas)).toStrictEqual({
      center: [0, 0],
      drawingRadius: 81.49846624323675,
      id: 1,
      lineWidth: 1.5,
      radius: 20,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    })
    expect(getDrawingMeasurement(MOCK_POINT_2, MOCK_MEASUREMENT_2, mockPixelToCanvas)).toStrictEqual({
      center: [10, 20],
      drawingRadius: 393.45139471096047,
      id: 2,
      lineWidth: 1.5,
      radius: 30,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    })
  })
  it('should return the ruler measurement', () => {
    const MOCK_MEASUREMENT_1: Measurement = {
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
    const MOCK_POINT_1: [Point, Point] = [
      [42, 122],
      [51, 203],
    ]
    const MOCK_POINT_2: [Point, Point] = [
      [531, 231],
      [151, 333],
    ]
    expect(getDrawingMeasurement(MOCK_POINT_1, MOCK_MEASUREMENT_1, mockPixelToCanvas)).toStrictEqual({
      id: 1,
      length: 14.142135623730951,
      linePoints: '0,0 10,10',
      lineWidth: 1.5,
      points: [
        [0, 0],
        [10, 10],
      ],
      textPoint: null,
      type: 'ruler',
      unit: 'px',
    })
    expect(getDrawingMeasurement(MOCK_POINT_2, MOCK_MEASUREMENT_2, mockPixelToCanvas)).toStrictEqual({
      id: 2,
      length: 8.48528137423857,
      linePoints: '0,0 10,10',
      lineWidth: 1.5,
      points: [
        [0, 0],
        [10, 10],
      ],
      textPoint: [50, 50],
      type: 'ruler',
      unit: 'mm',
    })
  })
})
