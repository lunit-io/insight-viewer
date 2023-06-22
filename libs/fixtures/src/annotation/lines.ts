import { LineAnnotation } from '@lunit/insight-viewer/annotation'

export const LINE_ANNOTATIONS: LineAnnotation[] = [
  {
    id: 1,
    labelPosition: [185.05142857142854, 183.05142857142854],
    lineWidth: 1.5,
    type: 'line',
    points: [
      [185.05142857142854, 183.05142857142854],
      [305.7371428571428, 188.17142857142855],
    ],
  },
  {
    id: 2,
    labelPosition: [263.3142857142857, 248.87999999999997],
    lineWidth: 1.5,
    type: 'line',
    points: [
      [263.3142857142857, 248.87999999999997],
      [370.1028571428571, 197.67999999999998],
    ],
  },
  {
    id: 3,
    labelPosition: [155.79428571428568, 267.1657142857143],
    lineWidth: 1.5,
    type: 'line',
    points: [
      [155.79428571428568, 267.1657142857143],
      [264.7771428571428, 297.88571428571424],
    ],
  },
  {
    id: 4,
    labelPosition: [350.35428571428565, 256.92571428571426],
    lineWidth: 1.5,
    type: 'line',
    points: [
      [350.35428571428565, 256.92571428571426],
      [283.79428571428565, 352.7428571428571],
    ],
  },
]

export const SMALLER_THAN_MINIMUM_LENGTH_LINE_ANNOTATION: LineAnnotation = {
  id: 1,
  labelPosition: [212.30857142857138, 289.4228571428571],
  lineWidth: 1.5,
  type: 'line',
  points: [
    [214.30857142857138, 294.4228571428571],
    [220.15999999999997, 294.4228571428571],
  ],
}
