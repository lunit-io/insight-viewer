import { calculateCircleArea } from './calculateCircleArea'

describe('calculateCircleArea: ', () => {
  it('should return the area', () => {
    expect(calculateCircleArea(1)).toEqual(Math.PI)
    expect(calculateCircleArea(10)).toEqual(314.1592653589793)
    expect(calculateCircleArea(20)).toEqual(1256.6370614359173)
    expect(calculateCircleArea(40)).toEqual(5026.548245743669)
    expect(calculateCircleArea(70)).toEqual(15393.804002589986)
    expect(calculateCircleArea(100)).toEqual(31415.926535897932)
  })
})
