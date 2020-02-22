import { useMemo, useState } from 'react';

export function useStateMemo<T>(state: T): T {
  const [keys] = useState<string[]>(() => Object.keys(state).sort((a, b) => (a > b ? -1 : 1)));

  return useMemo(
    () => state,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    keys.map(k => state[k]),
  );
}
