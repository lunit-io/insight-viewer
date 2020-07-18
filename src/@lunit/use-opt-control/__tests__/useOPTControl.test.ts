import { act, renderHook } from '@testing-library/react-hooks';
import { useControl } from '../useControl';

describe('useOPTControl()', () => {
  test('초깃값은 control: pan, invert: false, invert: false이어야 한다.', () => {
    const { result } = renderHook(() => useControl());

    expect(result.current.control).toBe('pan');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
  });

  test('인자를 통해 초깃값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() =>
      useControl({
        initialControl: 'adjust',
        initialFlip: true,
        initialInvert: true,
      }),
    );

    expect(result.current.control).toBe('adjust');
    expect(result.current.invert).toBeTruthy();
    expect(result.current.flip).toBeTruthy();
  });

  test('state값은 변경 가능하며, 변경하지 않은 값은 영향을 받지 않아야 한다.', () => {
    const { result } = renderHook(() => useControl());

    act(() => {
      result.current.updateControl('pen');
      result.current.updateFlip(true);
    });

    expect(result.current.control).toBe('pen');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeTruthy();
  });

  test('resetControl()를 이용하여 초깃값으로 reset이 가능해야 한다.', () => {
    const { result } = renderHook(() => useControl());

    act(() => {
      result.current.updateControl('adjust');
      result.current.updateInvert(true);
      result.current.updateFlip(true);
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

  test('인자로 넘긴 초깃값은 reset하면 control만 유지되고 flip과 invert는 false값이어야 한다.', () => {
    const { result } = renderHook(() =>
      useControl({
        initialControl: 'adjust',
        initialFlip: true,
        initialInvert: true,
      }),
    );

    act(() => {
      result.current.resetControl();
    });

    expect(result.current.control).toBe('adjust');
    expect(result.current.invert).toBeFalsy();
    expect(result.current.flip).toBeFalsy();
  });
});
