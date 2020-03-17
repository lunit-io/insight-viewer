import { useCallback, useState } from 'react';
import { Control } from './types';

export interface ControlState {
  control: Control;
  invert: boolean;
  flip: boolean;
  updateControl: (value: Control) => void;
  updateFlip: (value: boolean) => void;
  updateInvert: (value: boolean) => void;
  /** @deprecated use reset() */
  resetControl: () => void;
  reset: (props?: { control?: Control; invert?: boolean; flip?: boolean }) => void;
}

export type OPTControlState = Omit<ControlState, 'reset'>;

export function useControl({
  initialControl = 'pan',
  initialFlip = false,
  initialInvert = false,
}: { initialControl?: Control; initialFlip?: boolean; initialInvert?: boolean } = {}): ControlState {
  const [control, setControl] = useState<Control>(initialControl);
  const [invert, setInvert] = useState<boolean>(initialInvert);
  const [flip, setFlip] = useState<boolean>(initialFlip);

  const reset = useCallback(
    ({
      control = initialControl,
      flip = initialFlip,
      invert = initialInvert,
    }: { control?: Control; invert?: boolean; flip?: boolean } = {}) => {
      setControl(control);
      setInvert(invert);
      setFlip(flip);
    },
    [initialControl, initialFlip, initialInvert],
  );

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
    reset,
  };
}

/** @deprecated use useControl() */
export const useOPTControl = useControl;
