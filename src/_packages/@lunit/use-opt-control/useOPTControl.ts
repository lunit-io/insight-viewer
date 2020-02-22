import { useCallback, useState } from 'react';
import { Control } from './types';

export interface OPTControlState {
  control: Control;
  invert: boolean;
  flip: boolean;
  updateControl: (value: Control) => void;
  updateFlip: (value: boolean) => void;
  updateInvert: (value: boolean) => void;
  resetControl: () => void;
}

export function useOPTControl({ initialControl = 'pan' }: { initialControl?: Control } = {}): OPTControlState {
  const [control, setControl] = useState<Control>(initialControl);
  const [invert, setInvert] = useState<boolean>(false);
  const [flip, setFlip] = useState<boolean>(false);

  return {
    control,
    invert,
    flip,

    updateControl: setControl,
    updateInvert: setInvert,
    updateFlip: setFlip,
    resetControl: useCallback(() => {
      setControl(initialControl);
      setInvert(false);
      setFlip(false);
    }, [initialControl]),
  };
}
