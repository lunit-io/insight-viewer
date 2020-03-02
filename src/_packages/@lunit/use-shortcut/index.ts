import { DependencyList, useEffect } from 'react';

interface UseShortcutParameters {
  test: (event: KeyboardEvent) => boolean;
  callback: () => void;
  deps?: DependencyList;
  windows?: Window[];
}

export function useShortcut({ test, callback, deps = [], windows = [window] }: UseShortcutParameters) {
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

    // deps를 merge 하기 위한 조치
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, callback, windows, ...deps]);
}
