import type { Point } from '../../../types'
import { getArrowPosition } from './getArrowPosition'

describe('getArrowPosition:', () => {
  it('should return empty array when input array length is same or lower than 2', () => {
    const MOCK_EMPTY_POINTS: Point[] = []
    const MOCK_LENGTH_ONE_POINTS: Point[] = [[0, 0]]

    expect(getArrowPosition(MOCK_EMPTY_POINTS)).toEqual([])
    expect(getArrowPosition(MOCK_LENGTH_ONE_POINTS)).toEqual([])
  })
  it('should return empty array when input array length is bigger than 2', () => {
    const MOCK_POINTS_1: Point[] = [
      [10, 20],
      [30, 40],
    ]
    const MOCK_POINTS_2: Point[] = [
      [231, 312],
      [64, 432],
    ]
    const MOCK_POINTS_3: Point[] = [
      [324, 331],
      [1, 503],
    ]

    expect(getArrowPosition(MOCK_POINTS_1)).toEqual([
      [13.535533905932738, 23.535533905932738],
      [15.230810839623345, 21.69959346906221],
      [10, 20],
      [11.69959346906221, 25.230810839623345],
      [13.535533905932738, 23.535533905932738],
    ])
    expect(getArrowPosition(MOCK_POINTS_2)).toEqual([
      [226.93956308285698, 314.91767922189916],
      [228.47739515017997, 316.88737810811324],
      [231, 312],
      [225.56327812451462, 312.831898580729],
      [226.93956308285698, 314.91767922189916],
    ])
    expect(getArrowPosition(MOCK_POINTS_3)).toEqual([
      [319.58672330418375, 333.3501039990105],
      [320.8481332159229, 335.50729805708824],
      [324, 331],
      [318.5008984602314, 331.09940953331875],
      [319.58672330418375, 333.3501039990105],
    ])
  })
})
