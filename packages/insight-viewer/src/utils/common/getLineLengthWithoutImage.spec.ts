import { Point } from '../../types'
import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

describe('getLineLengthWithoutImage: ', () => {
  it('should return correct line length', () => {
    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [1, 1]
    const MOCK_START_POINT_3: Point = [2, 2]

    const MOCK_END_POINT_1: Point = [5, 5]
    const MOCK_END_POINT_2: Point = [10, 10]
    const MOCK_END_POINT_3: Point = [20, 20]

    expect(getLineLengthWithoutImage(MOCK_START_POINT_1, MOCK_END_POINT_1)).toEqual(7.0710678118654755)
    expect(getLineLengthWithoutImage(MOCK_START_POINT_2, MOCK_END_POINT_2)).toEqual(12.727922061357855)
    expect(getLineLengthWithoutImage(MOCK_START_POINT_3, MOCK_END_POINT_3)).toEqual(25.45584412271571)
  })
})
