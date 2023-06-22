import { RulerAnnotation } from '@lunit/insight-viewer/annotation'

export const RULER_MEASUREMENTS: RulerAnnotation[] = [
  {
    id: 1,
    type: 'ruler',
    startAndEndPoint: [
      [160.18285714285713, 201.73714285714283],
      [213.57714285714283, 205.39428571428567],
    ],
    measuredValue: 26.13,
    textPoint: [223.57714285714283, 225.39428571428567],
    unit: 'mm',
  },
  {
    id: 2,
    type: 'ruler',
    startAndEndPoint: [
      [179.19999999999996, 292.4342857142857],
      [225.27999999999997, 291.7028571428571],
    ],
    measuredValue: 22.5,
    textPoint: [235.27999999999997, 311.7028571428571],
    unit: 'mm',
  },
  {
    id: 3,
    type: 'ruler',
    startAndEndPoint: [
      [348.8914285714285, 221.48571428571424],
      [266.23999999999995, 239.77142857142854],
    ],
    measuredValue: 41.33,
    textPoint: [276.23999999999995, 259.77142857142854],
    unit: 'mm',
  },
]

export const SMALLER_THAN_MINIMUM_LENGTH_RULER_MEASUREMENT: RulerAnnotation = {
  id: 1,
  lineWidth: 1.5,
  type: 'ruler',
  startAndEndPoint: [
    [246.49142857142854, 248.1485714285714],
    [246.55428571428567, 248.1485714285714],
  ],
  measuredValue: 1.0101520273541005,
  unit: 'mm',
  textPoint: null,
}
