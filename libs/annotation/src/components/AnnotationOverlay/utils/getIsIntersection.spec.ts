import type { Point } from '../../../types'
import { getIsIntersection } from './getIsIntersection'

describe('getIsIntersection:', () => {
  /*
   * a is line 1 start point
   * b is line 1 end point
   * c is line 2 start point
   * d is line 2 end point
   *
   * ab is line 1, cd is line 2
   */

  it('ab and cd should be intersect', () => {
    const [a, b, c, d]: Point[] = [
      [0, 0],
      [10, 10],
      [10, 0],
      [0, 10],
    ]

    expect(getIsIntersection(a, b, c, d)).toBeTruthy()
  })
  it('ab and cd shouldn`t be intersect', () => {
    const [a, b, c, d]: Point[] = [
      [0, 0],
      [10, 0],
      [0, 10],
      [10, 10],
    ]

    expect(getIsIntersection(a, b, c, d)).toBeFalsy()
  })
})
