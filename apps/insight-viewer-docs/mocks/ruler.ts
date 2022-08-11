import { RulerMeasurement } from '@lunit/insight-viewer'

export const RULER_MEASUREMENTS: RulerMeasurement[] = [
  {
    id: 1,
    type: 'ruler',
    points: [
      [160.18285714285713, 201.73714285714283],
      [213.57714285714283, 205.39428571428567],
    ],
    length: 26.13,
    textPoint: [223.57714285714283, 225.39428571428567],
    unit: 'mm',
  },
  {
    id: 2,
    type: 'ruler',
    points: [
      [179.19999999999996, 292.4342857142857],
      [225.27999999999997, 291.7028571428571],
    ],
    length: 22.5,
    textPoint: [235.27999999999997, 311.7028571428571],
    unit: 'mm',
  },
  {
    id: 3,
    type: 'ruler',
    points: [
      [348.8914285714285, 221.48571428571424],
      [266.23999999999995, 239.77142857142854],
    ],
    length: 41.33,
    textPoint: [276.23999999999995, 259.77142857142854],
    unit: 'mm',
  },
  {
    id: 4,
    type: 'ruler',
    points: [
      [300.6171428571428, 348.0228571428571],
      [224.5485714285714, 366.3085714285714],
    ],
    length: 38.2,
    textPoint: [234.5485714285714, 386.3085714285714],
    unit: 'mm',
  },
]

export const SMALLER_THAN_MINIMUM_LENGTH_RULER_MEASUREMENT: RulerMeasurement = {
  id: 1,
  lineWidth: 1.5,
  type: 'ruler',
  points: [
    [246.49142857142854, 248.1485714285714],
    [246.55428571428567, 248.1485714285714],
  ],
  length: 1.0101520273541005,
  unit: 'mm',
  textPoint: null,
}
