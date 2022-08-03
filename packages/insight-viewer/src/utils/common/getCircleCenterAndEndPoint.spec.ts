import { Point } from '../../types'
import { Image } from '../../Viewer/types'
import { getCircleCenterAndEndPoint } from './getCircleCenterAndEndPoint'

describe('getCircleCenterAndEndPoint: ', () => {
  it('should return the points', () => {
    const MOCK_IMAGE = {
      columnPixelSpacing: 0.7,
      rowPixelSpacing: 0.7,
    } as Image

    const MOCK_POINT_1: Point = [0, 0]
    const MOCK_RADIUS_1 = 10
    const MOCK_POINT_2: Point = [10, 10]
    const MOCK_RADIUS_2 = 20
    const MOCK_POINT_3: Point = [20, 20]
    const MOCK_RADIUS_3 = 30

    expect(getCircleCenterAndEndPoint(MOCK_POINT_1, MOCK_RADIUS_1, MOCK_IMAGE)).toEqual([
      [0, 0],
      [14.285714285714286, 0],
    ])
    expect(getCircleCenterAndEndPoint(MOCK_POINT_2, MOCK_RADIUS_2, MOCK_IMAGE)).toEqual([
      [10, 10],
      [38.57142857142857, 10],
    ])
    expect(getCircleCenterAndEndPoint(MOCK_POINT_3, MOCK_RADIUS_3, MOCK_IMAGE)).toEqual([
      [20, 20],
      [62.85714285714286, 20],
    ])
  })
})
