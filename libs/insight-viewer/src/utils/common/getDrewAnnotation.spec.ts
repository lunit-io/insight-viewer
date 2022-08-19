import { Point } from '../../types'
import { Image } from '../../Viewer/types'
import { getDrewAnnotation } from './getDrewAnnotation'

describe('getDrewAnnotation: ', () => {
  it('should return the annotation without Image', () => {
    const MOCK_POINTS_1: Point[] = [
      [0, 0],
      [50, 50],
    ]
    const MOCK_POINTS_2: Point[] = [
      [100, 100],
      [150, 150],
    ]
    const MOCK_ID_1 = 10
    const MOCK_ID_2 = 15

    expect(getDrewAnnotation(null, MOCK_POINTS_1, MOCK_ID_1, 'line', 'normal')).toStrictEqual({
      hasArrowHead: false,
      id: 10,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(null, MOCK_POINTS_2, MOCK_ID_2, 'line', 'arrow')).toStrictEqual({
      hasArrowHead: true,
      id: 15,
      labelPosition: [98, 95],
      lineWidth: 1.5,
      points: [
        [100, 100],
        [150, 150],
      ],
      type: 'line',
    })
  })
  it('should return the annotation with Image', () => {
    const MOCK_POINTS_1: Point[] = [
      [0, 0],
      [50, 50],
    ]
    const MOCK_POINTS_2: Point[] = [
      [100, 100],
      [150, 150],
    ]
    const MOCK_IMAGE = {
      columnPixelSpacing: 0.6,
      rowPixelSpacing: 0.6,
    } as Image
    const MOCK_ID_1 = 40
    const MOCK_ID_2 = 99

    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, MOCK_ID_1, 'line', 'normal')).toStrictEqual({
      hasArrowHead: false,
      id: 40,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, MOCK_ID_1, 'line', 'arrow')).toStrictEqual({
      hasArrowHead: true,
      id: 40,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, MOCK_ID_2, 'text', 'normal')).toStrictEqual({
      id: 99,
      label: '',
      labelPosition: [0, 0],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'text',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_2, MOCK_ID_2, 'circle', 'normal')).toStrictEqual({
      id: 99,
      center: [100, 100],
      labelPosition: [100, 100],
      lineWidth: 1.5,
      radius: 42.42640687119285,
      type: 'circle',
    })
  })
})
