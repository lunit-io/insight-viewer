import { getIsIntersection } from './getIsIntersction'

describe('getIsIntersection:', () => {
  it('ab and cd should be intersect', () => {
    expect(getIsIntersection([0, 0], [10, 10], [10, 0], [0, 10])).toBeTruthy()
  })
  it('ab and cd shouldn`t be intersect', () => {
    expect(getIsIntersection([0, 0], [10, 0], [0, 10], [10, 10])).toBeFalsy()
  })
})
