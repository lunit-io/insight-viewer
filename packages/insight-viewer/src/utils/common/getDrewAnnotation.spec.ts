import { ARROW_HEAD, CIRCLE_MODE, LINE_MODE, NORMAL_HEAD, TEXT_MODE } from '../../mocks/const'
import { Point, Annotation } from '../../types'
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

    const MOCK_ANNOTATION_1: Annotation[] = []
    const MOCK_ANNOTATION_2: Annotation[] = [
      {
        hasArrowHead: false,
        id: 1,
        labelPosition: [-2, -5],
        lineWidth: 1.5,
        points: [
          [0, 0],
          [50, 50],
        ],
        type: 'line',
      },
    ]

    expect(getDrewAnnotation(null, MOCK_POINTS_1, LINE_MODE, NORMAL_HEAD, MOCK_ANNOTATION_1)).toStrictEqual({
      hasArrowHead: false,
      id: 1,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(null, MOCK_POINTS_2, LINE_MODE, ARROW_HEAD, MOCK_ANNOTATION_2)).toStrictEqual({
      hasArrowHead: true,
      id: 2,
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

    const MOCK_ANNOTATION_1: Annotation[] = []
    const MOCK_ANNOTATION_2: Annotation[] = [
      {
        hasArrowHead: false,
        id: 1,
        labelPosition: [-2, -5],
        lineWidth: 1.5,
        points: [
          [0, 0],
          [50, 50],
        ],
        type: 'line',
      },
    ]
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, LINE_MODE, NORMAL_HEAD, MOCK_ANNOTATION_1)).toStrictEqual({
      hasArrowHead: false,
      id: 1,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, LINE_MODE, ARROW_HEAD, MOCK_ANNOTATION_1)).toStrictEqual({
      hasArrowHead: true,
      id: 1,
      labelPosition: [-2, -5],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, TEXT_MODE, NORMAL_HEAD, MOCK_ANNOTATION_1)).toStrictEqual({
      id: 1,
      label: '',
      labelPosition: [0, 0],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'text',
    })
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_2, CIRCLE_MODE, NORMAL_HEAD, MOCK_ANNOTATION_2)).toStrictEqual({
      id: 2,
      center: [100, 100],
      labelPosition: [100, 100],
      lineWidth: 1.5,
      radius: 42.42640687119285,
      type: 'circle',
    })
  })
})
