import { useContour } from '@lunit/insight-viewer';
import { act, renderHook } from '@testing-library/react-hooks';
import { initialContours } from '../__fixtures__/contour';

describe('userContour()', () => {
  test('should not change the references of the all callbacks', () => {
    const { result } = renderHook(() => useContour());

    const { addContour, addContours, updateContour, removeAllContours, removeContour, focusContour } = result.current;

    function testCallbackReferenceChanging(current: typeof result.current) {
      expect(current.addContour).toBe(addContour);
      expect(current.addContours).toBe(addContours);
      expect(current.updateContour).toBe(updateContour);
      expect(current.removeContour).toBe(removeContour);
      expect(current.removeAllContours).toBe(removeAllContours);
      expect(current.focusContour).toBe(focusContour);
    }

    expect(result.current.contours).toHaveLength(0);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.addContour(initialContours[0].polygon));

    expect(result.current.contours).toHaveLength(1);
    testCallbackReferenceChanging(result.current);

    act(() => result.current.addContours([initialContours[1], initialContours[2]]));

    expect(result.current.contours).toHaveLength(3);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.focusContour(result.current.contours[1]));

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.focusedContour).toBe(result.current.contours[1]);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.focusContour(null));

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.focusedContour).toBe(null);
    testCallbackReferenceChanging(result.current);

    act(
      () =>
        void result.current.updateContour(result.current.contours[0], {
          label: 'foo',
        }),
    );

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.contours[0].label).toBe('foo');
    testCallbackReferenceChanging(result.current);

    act(() => result.current.removeContour(result.current.contours[1]));

    expect(result.current.contours).toHaveLength(2);
    testCallbackReferenceChanging(result.current);

    act(() => result.current.removeAllContours());

    expect(result.current.contours).toHaveLength(0);
    testCallbackReferenceChanging(result.current);
  });
});
