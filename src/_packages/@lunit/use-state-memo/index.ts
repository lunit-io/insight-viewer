import { useMemo, useState } from 'react';

export function useStateMemo<T>(state: T): T {
  const [keys] = useState<string[]>(() => Object.keys(state).sort((a, b) => a > b ? -1 : 1));
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => state, keys.map(k => state[k]));
}