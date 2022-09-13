import { Point } from '../../types'
import { getRulerTextPosition } from './getRulerTextPosition'

describe('getRulerTextPosition: ', () => {
  it('should return the point', () => {
    const MOCK_POINT_1: Point = [29, 12]
    const MOCK_POINT_2: Point = [439, 112]
    const MOCK_POINT_3: Point = [62, 232]

    expect(getRulerTextPosition(MOCK_POINT_1)).toEqual([39, 2])
    expect(getRulerTextPosition(MOCK_POINT_2)).toEqual([449, 102])
    expect(getRulerTextPosition(MOCK_POINT_3)).toEqual([72, 222])
  })
})
