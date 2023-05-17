import type { Point } from '../../../types'
import { getRulerTextPosition } from './getRulerTextPosition'

describe('getRulerTextPosition: ', () => {
  it('should return the point', () => {
    const MOCK_POINT_1: [Point, Point] = [
      [29, 12],
      [31, 122],
    ]
    const MOCK_POINT_2: [Point, Point] = [
      [439, 112],
      [50, 12],
    ]
    const MOCK_POINT_3: [Point, Point] = [
      [62, 232],
      [100, 500],
    ]

    expect(getRulerTextPosition(MOCK_POINT_1)).toEqual([31.7271525467006, 161.9933900685329])
    expect(getRulerTextPosition(MOCK_POINT_2)).toEqual([11.259596488265387, 2.041027374875421])
    expect(getRulerTextPosition(MOCK_POINT_3)).toEqual([105.61547398445572, 539.6038691535298])
  })
})
