import { Control } from '@lunit/use-opt-control';
import { Box, Button, FormControlLabel, Radio, RadioGroup, Slider, Switch, Typography } from '@material-ui/core';
import React, { ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';

export type Wheel = 'none' | 'zoom' | 'scroll';

export interface InsightViewerControllerOptions {
  width: [number, number, number] | number;
  height: [number, number, number] | number;
  control: [Control, Control[]] | Control;
  wheel: [Wheel, Wheel[]] | Wheel;
  invert: [boolean] | boolean;
  flip: [boolean] | boolean;
}

export interface InsightViewerControllerProps {
  children: (controllerState: InsightViewerControllerState) => ReactNode;
  options: InsightViewerControllerOptions;
}

export interface InsightViewerControllerState {
  options: InsightViewerControllerOptions;

  width: number;
  height: number;
  control: Control;
  wheel: Wheel;
  invert: boolean;
  flip: boolean;
  resetTime: number;

  updateWidth: (value: number) => void;
  updateHeight: (value: number) => void;
  updateControl: (value: Control) => void;
  updateWheel: (value: Wheel) => void;
  updateInvert: (value: boolean) => void;
  updateFlip: (value: boolean) => void;
  updateResetTime: (value: number) => void;
}

export function InsightViewerTestController({ children, options }: InsightViewerControllerProps) {
  const [width, setWidth] = useState<number>(() => (Array.isArray(options.width) ? options.width[0] : options.width));
  const [height, setHeight] = useState<number>(() =>
    Array.isArray(options.height) ? options.height[0] : options.height,
  );
  const [control, setControl] = useState<Control>(() =>
    Array.isArray(options.control) ? options.control[0] : options.control,
  );
  const [wheel, setWheel] = useState<Wheel>(() => (Array.isArray(options.wheel) ? options.wheel[0] : options.wheel));
  const [invert, setInvert] = useState(() => (Array.isArray(options.invert) ? options.invert[0] : options.invert));
  const [flip, setFlip] = useState(() => (Array.isArray(options.flip) ? options.flip[0] : options.flip));
  const [resetTime, setResetTime] = useState(Date.now());

  const state: InsightViewerControllerState = useMemo<InsightViewerControllerState>(
    () => ({
      options,
      width,
      height,
      control,
      wheel,
      invert,
      flip,
      resetTime,
      updateWidth: setWidth,
      updateHeight: setHeight,
      updateControl: setControl,
      updateWheel: setWheel,
      updateInvert: setInvert,
      updateFlip: setFlip,
      updateResetTime: setResetTime,
    }),
    [
      options,
      width,
      height,
      control,
      wheel,
      invert,
      flip,
      resetTime,
      setWidth,
      setHeight,
      setControl,
      setWheel,
      setInvert,
      setFlip,
      setResetTime,
    ],
  );

  return (
    <>
      {children(state)}
      <Controller {...state} />
    </>
  );
}

function Controller({
  options,
  width,
  height,
  control,
  wheel,
  invert,
  flip,
  resetTime,
  updateWidth,
  updateHeight,
  updateControl,
  updateWheel,
  updateInvert,
  updateFlip,
  updateResetTime,
}: InsightViewerControllerState) {
  return (
    <FloatingBox>
      {Array.isArray(options.width) && (
        <>
          <Typography gutterBottom>Width</Typography>
          <Slider
            color="primary"
            value={width}
            min={options.width[1]}
            max={options.width[2]}
            onChange={(event, nextValue) => updateWidth(nextValue as number)}
          />
        </>
      )}

      {Array.isArray(options.height) && (
        <>
          <Typography gutterBottom>Height</Typography>
          <Slider
            color="primary"
            value={height}
            min={options.height[1]}
            max={options.height[2]}
            onChange={(event, nextValue) => updateHeight(nextValue as number)}
          />
        </>
      )}

      {Array.isArray(options.control) && (
        <>
          <Typography gutterBottom>Control</Typography>
          <RadioGroup value={control} onChange={(event, nextValue) => updateControl(nextValue as Control)}>
            {options.control[1].map(value => (
              <FormControlLabel
                color="primary"
                key={value}
                value={value}
                control={<Radio color="primary" />}
                label={value.toUpperCase()}
              />
            ))}
          </RadioGroup>
        </>
      )}

      {Array.isArray(options.wheel) && (
        <>
          <Typography gutterBottom>Wheel</Typography>
          <RadioGroup value={wheel} onChange={(event, nextValue) => updateWheel(nextValue as Wheel)}>
            {options.wheel[1].map(value => (
              <FormControlLabel
                color="primary"
                key={value}
                value={value}
                control={<Radio color="primary" />}
                label={value.toUpperCase()}
              />
            ))}
          </RadioGroup>
        </>
      )}

      {Array.isArray(options.invert) && (
        <>
          <Typography gutterBottom>Invert</Typography>
          <Switch checked={invert} color="primary" onChange={(event, nextValue) => updateInvert(nextValue)} />
        </>
      )}

      {Array.isArray(options.flip) && (
        <>
          <Typography gutterBottom>Flip</Typography>
          <Switch checked={flip} color="primary" onChange={(event, nextValue) => updateFlip(nextValue)} />
        </>
      )}

      <Typography gutterBottom>Reset</Typography>
      <Button variant="contained" color="primary" onClick={() => updateResetTime(Date.now())}>
        Reset
      </Button>
    </FloatingBox>
  );
}

const FloatingBox = styled(Box)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 200px;
`;
