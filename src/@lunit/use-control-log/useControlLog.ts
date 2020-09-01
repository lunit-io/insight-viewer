import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Log } from './types';

export interface ControlLog {
  controlLog: RefObject<Log[]>;
  addControlLog: (log: Omit<Log, 'time'>) => void;
}

export function useControlLog(sessionId: string): ControlLog {
  const controlLog: MutableRefObject<Log[]> = useRef([]);

  useEffect(() => {
    controlLog.current = [];
  }, [sessionId]);

  return {
    controlLog,
    addControlLog: useCallback(
      (log: Omit<Log, 'time'>) => {
        controlLog.current.push({
          ...log,
          time: Date.now(),
        });
      },
      [controlLog],
    ),
  };
}
