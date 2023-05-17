/* eslint-disable import/newline-after-import */
import type { Point } from '../types'
import { getCircleEditPoints } from './getCircleEditPoints'

describe('getCircleEditPoints:', () => {
  it('the circle edit points should be calculated', () => {
    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [10, 100]
    const MOCK_START_POINT_3: Point = [20, 50]
    const MOCK_RADIUS_1 = 1
    const MOCK_RADIUS_2 = 15
    const MOCK_RADIUS_3 = 30

    expect(getCircleEditPoints(MOCK_START_POINT_1, MOCK_RADIUS_1)).toEqual([
      [-0.7071067811865475, -0.7071067811865476],
      [0.7071067811865476, 0.7071067811865475],
    ])
    expect(getCircleEditPoints(MOCK_START_POINT_2, MOCK_RADIUS_2)).toEqual([
      [-0.6066017177982115, 89.39339828220179],
      [20.606601717798213, 110.60660171779821],
    ])
    expect(getCircleEditPoints(MOCK_START_POINT_3, MOCK_RADIUS_3)).toEqual([
      [-1.213203435596423, 28.786796564403573],
      [41.21320343559643, 71.21320343559643],
    ])
  })
})
