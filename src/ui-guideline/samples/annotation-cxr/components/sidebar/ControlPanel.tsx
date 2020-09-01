import { Button, ButtonLayout, SessionPanel } from '@lunit/opt-components';
import {
  AdjustIcon,
  FlipIcon,
  InvertIcon,
  MagnifyIcon,
  PanIcon,
  PenIcon,
  ResetIcon,
} from '@lunit/opt-control-icons';
import { Control } from '@lunit/use-opt-control';
import React, { useCallback } from 'react';

export interface ControlPanelProps {
  control: Control;
  flip: boolean;
  invert: boolean;
  availablePen: boolean;
  onResetControl: () => void;
  onControlChanged: (nextControl: Control) => void;
  onFlipChanged: (nextFlip: boolean) => void;
  onInvertChanged: (nextInvert: boolean) => void;
  onReset: () => void;
  disabled: boolean;
}

export function ControlPanel({
  control,
  flip,
  invert,
  availablePen,
  onResetControl,
  onControlChanged,
  onFlipChanged,
  onInvertChanged,
  onReset,
  disabled,
}: ControlPanelProps) {
  const reset = useCallback(() => {
    onResetControl();
    onReset();
  }, [onResetControl, onReset]);

  return (
    <SessionPanel
      title="CONTROL"
      sessionId="control"
      disabled={disabled}
      defaultExpanded
    >
      {(expanded) => {
        const direction = expanded ? 'vertical' : 'horizontal';
        const layout = expanded ? 'left' : 'center';

        return (
          <>
            <ButtonLayout direction={direction} style={{ marginBottom: 10 }}>
              {availablePen && (
                <Button
                  layout={layout}
                  label={expanded ? 'PEN' : undefined}
                  icon={<PenIcon />}
                  selected={control === 'pen'}
                  onChange={(nextSelected) =>
                    nextSelected && onControlChanged('pen')
                  }
                />
              )}
              <Button
                layout={layout}
                label={expanded ? 'PAN' : undefined}
                icon={<PanIcon />}
                selected={control === 'pan'}
                onChange={(nextSelected) =>
                  nextSelected && onControlChanged('pan')
                }
              />
              <Button
                layout={layout}
                label={expanded ? 'ADJUST' : undefined}
                icon={<AdjustIcon />}
                selected={control === 'adjust'}
                onChange={(nextSelected) =>
                  nextSelected && onControlChanged('adjust')
                }
              />
              <Button
                layout={layout}
                label={expanded ? 'MAGNIFY' : undefined}
                icon={<MagnifyIcon />}
                selected={control === 'magnify'}
                onChange={(nextSelected) =>
                  nextSelected && onControlChanged('magnify')
                }
              />
            </ButtonLayout>

            <ButtonLayout direction={direction}>
              <Button
                layout={layout}
                label={expanded ? 'FLIP' : undefined}
                icon={<FlipIcon />}
                selected={flip}
                onChange={(nextSelected) => onFlipChanged(nextSelected)}
              />
              <Button
                layout={layout}
                label={expanded ? 'INVERT' : undefined}
                icon={<InvertIcon />}
                selected={invert}
                onChange={(nextSelected) => onInvertChanged(nextSelected)}
              />
              <Button
                layout={layout}
                label={expanded ? 'RESET' : undefined}
                icon={<ResetIcon />}
                onClick={() => reset()}
                style={{ marginTop: direction === 'vertical' ? 10 : 0 }}
              />
            </ButtonLayout>
          </>
        );
      }}
    </SessionPanel>
  );
}
