import { Point, Annotation } from '../../types'
import { getDrewAnnotation } from './getDrewAnnotation'

describe('getDrewAnnotation: ', () => {
  it('should return the correct annotation without Image ', () => {
    const MOCK_POINTS_1: Point[] = [
      [0, 0],
      [50, 50],
    ]
    const MOCK_POINTS_2: Point[] = [
      [100, 100],
      [150, 150],
    ]
    const MOCK_IMAGE = null
    const MOCK_MODE = 'line'
    const MOCK_LINE_HEAD_1 = 'normal'
    const MOCK_LINE_HEAD_2 = 'arrow'
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

    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_1, MOCK_MODE, MOCK_LINE_HEAD_1, MOCK_ANNOTATION_1)).toStrictEqual({
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
    expect(getDrewAnnotation(MOCK_IMAGE, MOCK_POINTS_2, MOCK_MODE, MOCK_LINE_HEAD_2, MOCK_ANNOTATION_2)).toStrictEqual({
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
})
