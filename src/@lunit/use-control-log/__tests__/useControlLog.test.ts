import { act, renderHook } from '@testing-library/react-hooks';
import { useControlLog } from '../useControlLog';

describe('useControlLog()', () => {
  test('addControlLog', () => {
    const { result, rerender } = renderHook(
      ({ sessionId }) => useControlLog(sessionId),
      {
        initialProps: {
          sessionId: 'session1',
        },
      },
    );

    expect(result.current.controlLog.current).toHaveLength(0);

    act(() => {
      result.current.addControlLog({ command: 'a' });
      result.current.addControlLog({ command: 'b' });
    });

    expect(result.current.controlLog.current).toHaveLength(2);

    act(() => {
      result.current.addControlLog({ command: 'c' });
      result.current.addControlLog({ command: 'd' });
    });

    expect(result.current.controlLog.current).toHaveLength(4);
    expect(
      result.current.controlLog.current!.map(({ command }) => command).join(''),
    ).toBe('abcd');

    rerender({
      sessionId: 'session2',
    });

    expect(result.current.controlLog.current).toHaveLength(0);
  });
});
