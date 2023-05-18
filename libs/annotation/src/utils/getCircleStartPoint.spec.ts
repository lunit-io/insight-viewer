import { getCircleStartPoint } from './getCircleStartPoint'

import type { Point } from '../types'

describe('getCircleStartPoint: ', () => {
  it('should return the start point of circle', () => {
    const MOCK_CENTER_POINT_1: Point = [0, 0]
    const MOCK_RADIUS_1 = 10
    const MOCK_CENTER_POINT_2: Point = [10, 10]
    const MOCK_RADIUS_2 = 20
    const MOCK_CENTER_POINT_3: Point = [20, 20]
    const MOCK_RADIUS_3 = 30

    expect(getCircleStartPoint(MOCK_CENTER_POINT_1, MOCK_RADIUS_1)).toEqual([-10, 0])
    expect(getCircleStartPoint(MOCK_CENTER_POINT_2, MOCK_RADIUS_2)).toEqual([-10, 10])
    expect(getCircleStartPoint(MOCK_CENTER_POINT_3, MOCK_RADIUS_3)).toEqual([-10, 20])
  })
})
