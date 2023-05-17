import { getCircleTextPosition } from './getCircleTextPosition'
import type { Point } from '../../../types'

describe('getCircleTextPosition: ', () => {
  it('should return the position', () => {
    const MOCK_POINT_1: Point = [0, 0]
    const MOCK_RADIUS_1 = 10
    const MOCK_POINT_2: Point = [10, 10]
    const MOCK_RADIUS_2 = 20
    const MOCK_POINT_3: Point = [20, 20]
    const MOCK_RADIUS_3 = 30

    expect(getCircleTextPosition(MOCK_POINT_1, MOCK_RADIUS_1)).toEqual([82.07106781186548, 17.071067811865476])
    expect(getCircleTextPosition(MOCK_POINT_2, MOCK_RADIUS_2)).toEqual([99.14213562373095, 34.14213562373095])
    expect(getCircleTextPosition(MOCK_POINT_3, MOCK_RADIUS_3)).toEqual([116.21320343559643, 51.21320343559643])
  })
})
