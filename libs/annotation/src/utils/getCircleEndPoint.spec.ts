import { getCircleEndPoint } from './getCircleEndPoint'

import type { Point } from '../types'

describe('getCircleEndPoint: ', () => {
  it('should return the end point of circle', () => {
    const MOCK_CENTER_POINT_1: Point = [0, 0]
    const MOCK_RADIUS_1 = 10
    const MOCK_CENTER_POINT_2: Point = [10, 10]
    const MOCK_RADIUS_2 = 20
    const MOCK_CENTER_POINT_3: Point = [20, 20]
    const MOCK_RADIUS_3 = 30

    expect(getCircleEndPoint(MOCK_CENTER_POINT_1, MOCK_RADIUS_1)).toEqual([10, 0])
    expect(getCircleEndPoint(MOCK_CENTER_POINT_2, MOCK_RADIUS_2)).toEqual([30, 10])
    expect(getCircleEndPoint(MOCK_CENTER_POINT_3, MOCK_RADIUS_3)).toEqual([50, 20])
  })
})
