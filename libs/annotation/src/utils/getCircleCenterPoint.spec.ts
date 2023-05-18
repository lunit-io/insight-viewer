import { getCircleCenterPoint } from './getCircleCenterPoint'

import type { Point } from '../types'

describe('getCircleCenterPoint: ', () => {
  it('should return the center point', () => {
    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_END_POINT_1: Point = [10, 20]
    const MOCK_START_POINT_2: Point = [15, 20]
    const MOCK_END_POINT_2: Point = [40, 17]
    const MOCK_START_POINT_3: Point = [1, 29]
    const MOCK_END_POINT_3: Point = [4, 5]

    expect(getCircleCenterPoint(MOCK_START_POINT_1, MOCK_END_POINT_1)).toEqual([5, 10])
    expect(getCircleCenterPoint(MOCK_START_POINT_2, MOCK_END_POINT_2)).toEqual([27.5, 18.5])
    expect(getCircleCenterPoint(MOCK_START_POINT_3, MOCK_END_POINT_3)).toEqual([2.5, 17])
  })
})
