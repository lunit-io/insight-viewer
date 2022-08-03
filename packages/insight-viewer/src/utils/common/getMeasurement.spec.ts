import { CIRCLE_MODE, RULER_MODE } from '../../mocks/const'
import { Point, Measurement } from '../../types'
import { Image } from '../../Viewer/types'
import { getMeasurement } from './getMeasurement'

describe('getMeasurement: ', () => {
  it('should return the measurement in ruler mode without text, image', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_MEASUREMENTS_1: Measurement[] = []
    const MOCK_MEASUREMENTS_2: Measurement[] = [
      {
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
      },
    ]

    expect(getMeasurement(MOCK_POINTS, null, RULER_MODE, MOCK_MEASUREMENTS_1, null)).toStrictEqual({
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
    })

    expect(getMeasurement(MOCK_POINTS, null, RULER_MODE, MOCK_MEASUREMENTS_2, null)).toStrictEqual({
      id: 2,
      length: 14.142135623730951,
      lineWidth: 1.5,
      points: [
        [0, 0],
        [10, 10],
      ],
      textPoint: null,
      type: 'ruler',
      unit: 'px',
    })
  })

  it('should return the measurement in ruler mode with text, image', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_TEXT_POINT: Point = [50, 50]
    const MOCK_MEASUREMENTS: Measurement[] = []
    const MOCK_IMAGE = {
      columnPixelSpacing: 0.6,
      rowPixelSpacing: 0.6,
    } as Image

    expect(getMeasurement(MOCK_POINTS, MOCK_TEXT_POINT, RULER_MODE, MOCK_MEASUREMENTS, MOCK_IMAGE)).toStrictEqual({
      id: 1,
      length: 8.48528137423857,
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

  it('should return the measurement in circle mode without text, image', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_MEASUREMENTS: Measurement[] = []

    expect(getMeasurement(MOCK_POINTS, null, CIRCLE_MODE, MOCK_MEASUREMENTS, null)).toStrictEqual({
      center: [0, 0],
      id: 1,
      lineWidth: 1.5,
      radius: 14.142135623730951,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    })

    const MOCK_ADDED_MEASUREMENTS: Measurement[] = [
      {
        center: [0, 0],
        id: 1,
        lineWidth: 1.5,
        radius: 14.142135623730951,
        textPoint: null,
        type: 'circle',
        unit: 'px',
      },
    ]
    const EXPECTED_2 = {
      center: [0, 0],
      id: 2,
      lineWidth: 1.5,
      radius: 14.142135623730951,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getMeasurement(MOCK_POINTS, null, CIRCLE_MODE, MOCK_ADDED_MEASUREMENTS, null)).toStrictEqual(EXPECTED_2)
  })

  it('should return the measurement in circle mode with text, image', () => {
    const MOCK_POINTS: Point[] = [
      [0, 0],
      [10, 10],
      [20, 20],
      [30, 30],
      [40, 40],
    ]
    const MOCK_TEXT_POINT: Point = [50, 50]
    const MOCK_MEASUREMENTS: Measurement[] = []
    const MOCK_IMAGE = {
      columnPixelSpacing: 0.6,
      rowPixelSpacing: 0.6,
    } as Image

    expect(getMeasurement(MOCK_POINTS, MOCK_TEXT_POINT, RULER_MODE, MOCK_MEASUREMENTS, MOCK_IMAGE)).toStrictEqual({
      id: 1,
      length: 8.48528137423857,
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
