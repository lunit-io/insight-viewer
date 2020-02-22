import { useCallback, useState } from 'react';

export interface ResetTimeState {
  resetTime: number;
  updateResetTime: () => void;
}

export function useResetTime(): ResetTimeState {
  const [resetTime, setResetTime] = useState<number>(Date.now());

  const updateResetTime = useCallback(() => {
    setResetTime(Date.now());
  }, []);

  return {
    resetTime,
    updateResetTime,
  };
}
