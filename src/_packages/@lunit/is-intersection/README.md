# Install

```sh
npm install @lunit/is-intersection
```

# API

```
isIntersection(a: [number, number], b: [number, number], c: [number, number], d: [number, number]): boolean
```

# Sample Codes

## Tests

<!-- import __tests__/*.{ts,tsx} --title-tag h3 -->

### \_\_tests\_\_/isIntersection.test.ts


```ts
import { isIntersection } from '@lunit/is-intersection';

describe('isIntersection()', () => {
  test('ab와 cd는 교차한다', () => {
    expect(isIntersection([0, 0], [10, 10], [10, 0], [0, 10])).toBeTruthy();
  });

  test('ab와 cd는 교차하지 않는다', () => {
    expect(isIntersection([0, 0], [10, 0], [0, 10], [10, 10])).toBeFalsy();
  });
});

```

<!-- importend -->