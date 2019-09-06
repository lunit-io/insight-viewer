import { isIntersection } from '@lunit/is-intersection';

describe('isIntersection()', () => {
  test('ab와 cd는 교차한다', () => {
    expect(isIntersection([0, 0], [10, 10], [10, 0], [0, 10])).toBeTruthy();
  });
  
  test('ab와 cd는 교차하지 않는다', () => {
    expect(isIntersection([0, 0], [10, 0], [0, 10], [10, 10])).toBeFalsy();
  });
});