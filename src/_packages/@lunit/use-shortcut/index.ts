import { DependencyList, useEffect } from 'react';

interface UseShortcutParameters {
  /** KeyboardEvent Test */
  test: (event: KeyboardEvent) => boolean;

  /** Shortcut Handler */
  callback: () => void;

  /** @deprecated 입력하지 않아도 된다 */
  deps?: DependencyList;

  /** Popup과 같이 여러개의 Window를 일괄 통제해야 하는 경우 */
  windows?: Window[];
}

export function useShortcut({ test, callback, windows = [window] }: UseShortcutParameters) {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      // event.target instanceof HTMLElement ) block... from input, text field...
      if (test(event)) {
        callback();
      }
    }

    windows.forEach(window => window.addEventListener('keyup', handler));

    return () => {
      windows.forEach(window => window.removeEventListener('keyup', handler));
    };
  }, [test, callback, windows]);
}

export const key = (
  key: string | string[],
  { ctrl = false, alt = false, shift = false }: { ctrl?: boolean; alt?: boolean; shift?: boolean } = {},
) => (event: KeyboardEvent) => {
  const keys: string[] = typeof key === 'string' ? [key.toLowerCase()] : key.map(k => k.toLowerCase());

  return (
    keys.indexOf(event.key.toLowerCase()) > -1 &&
    (ctrl ? event.ctrlKey : true) &&
    (alt ? event.altKey : true) &&
    (shift ? event.shiftKey : true)
  );
};
