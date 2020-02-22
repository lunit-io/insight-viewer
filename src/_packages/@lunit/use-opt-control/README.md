# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->
<!-- importend -->

## Tests

<!-- import **/*.test.{ts,tsx} --title-tag h3 -->

### \_\_tests\_\_/useOPTControl.test.ts


```ts
import { act, renderHook } from '@testing-library/react-hooks';
import { useOPTControl } from '../useOPTControl';

describe('useOPTControl()', () => {
  test('basic', () => {
    const { result } = renderHook(() => useOPTControl());

    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();

    act(() => {
      result.current.updateControl('pen');
      result.current.updateFlip(true);
    });

    expect(result.current.control).toBe('pen');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeTruthy();

    act(() => {
      result.current.updateControl('adjust');
      result.current.updateInvert(true);
    });

    expect(result.current.control).toBe('adjust');
    expect(result.current.invert).toBeTruthy();
    expect(result.current.flip).toBeTruthy();

    act(() => {
      result.current.resetControl();
    });

    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
  });
});

```

<!-- importend -->

<!-- import __tests__/*.{ts,tsx} --title-tag h3 -->

### \_\_tests\_\_/useOPTControl.test.ts


```ts
import { act, renderHook } from '@testing-library/react-hooks';
import { useOPTControl } from '../useOPTControl';

describe('useOPTControl()', () => {
  test('basic', () => {
    const { result } = renderHook(() => useOPTControl());

    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();

    act(() => {
      result.current.updateControl('pen');
      result.current.updateFlip(true);
    });

    expect(result.current.control).toBe('pen');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeTruthy();

    act(() => {
      result.current.updateControl('adjust');
      result.current.updateInvert(true);
    });

    expect(result.current.control).toBe('adjust');
    expect(result.current.invert).toBeTruthy();
    expect(result.current.flip).toBeTruthy();

    act(() => {
      result.current.resetControl();
    });

    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
  });
});

```

<!-- importend -->