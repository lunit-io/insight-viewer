import { Control } from '@lunit/use-opt-control';
import { Box, FormControlLabel, Radio, RadioGroup, Slider, Switch, Typography } from '@material-ui/core';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import React, { Context, createContext, createElement, isValidElement, useContext, useState } from 'react';
import styled from 'styled-components';

export type Wheel = 'none' | 'zoom' | 'scroll';

export interface ControllerOptions {
  width: [number, number, number];
  height: [number, number, number];
  control: [Control, Control[]];
  wheel: [Wheel, Wheel[]];
  invert: boolean;
  flip: boolean;
}

export interface ControllerProviderProps {
  //tslint:disable-next-line:no-any
  storyFn: StoryFn<any>;
  options: ControllerOptions;
}

export interface ControllerState {
  options: ControllerOptions;
  
  width: number;
  height: number;
  control: Control;
  wheel: Wheel;
  invert: boolean;
  flip: boolean;
  
  updateWidth: (value: number) => void;
  updateHeight: (value: number) => void;
  updateControl: (value: Control) => void;
  updateWheel: (value: Wheel) => void;
  updateInvert: (value: boolean) => void;
  updateFlip: (value: boolean) => void;
}

// @ts-ignore
const ControllerContext: Context<ControllerState> = createContext<ControllerState>();

function ControllerProvider({storyFn, options}: ControllerProviderProps) {
  const [width, setWidth] = useState<number>(options.width[0]);
  const [height, setHeight] = useState<number>(options.height[0]);
  const [control, setControl] = useState<Control>(options.control[0]);
  const [wheel, setWheel] = useState<Wheel>(options.wheel[0]);
  const [invert, setInvert] = useState(options.invert);
  const [flip, setFlip] = useState(options.flip);
  
  const story = storyFn();
  
  return (
    <ControllerContext.Provider value={{
      options,
      width,
      height,
      control,
      wheel,
      invert,
      flip,
      updateWidth: setWidth,
      updateHeight: setHeight,
      updateControl: setControl,
      updateWheel: setWheel,
      updateInvert: setInvert,
      updateFlip: setFlip,
    }}>
      {
        typeof story === 'function'
          ? createElement(story)
          : isValidElement(story)
          ? story
          : <div>story is not valid element</div>
      }
      <Controller/>
    </ControllerContext.Provider>
  );
}

export function useController(): ControllerState {
  return useContext(ControllerContext);
}

function Controller() {
  const {
    options,
    width,
    height,
    control,
    wheel,
    invert,
    flip,
    updateWidth,
    updateHeight,
    updateControl,
    updateWheel,
    updateInvert,
    updateFlip,
  } = useController();
  
  return (
    <FloatingBox>
      <Typography gutterBottom>
        Width
      </Typography>
      
      <Slider
        defaultValue={width}
        min={options.width[1]}
        max={options.width[2]}
        onChange={(event, nextValue) => updateWidth(nextValue as number)}/>
      
      <Typography gutterBottom>
        Height
      </Typography>
      
      <Slider
        defaultValue={height}
        min={options.height[1]}
        max={options.height[2]}
        onChange={(event, nextValue) => updateHeight(nextValue as number)}/>
      
      <Typography gutterBottom>
        Control
      </Typography>
      
      <RadioGroup value={control}
                  onChange={(event, nextValue) => updateControl(nextValue as Control)}>
        {
          options.control[1].map(value => (
            <FormControlLabel key={value}
                              value={value}
                              control={<Radio/>}
                              label={value.toUpperCase()}/>
          ))
        }
      </RadioGroup>
      
      <Typography gutterBottom>
        Wheel
      </Typography>
      
      <RadioGroup value={wheel}
                  onChange={(event, nextValue) => updateWheel(nextValue as Wheel)}>
        {
          options.wheel[1].map(value => (
            <FormControlLabel key={value}
                              value={value}
                              control={<Radio/>}
                              label={value.toUpperCase()}/>
          ))
        }
      </RadioGroup>
      
      <Typography gutterBottom>
        Invert
      </Typography>
      
      <Switch checked={invert}
              color="primary"
              onChange={(event, nextValue) => updateInvert(nextValue)}/>
      
      <Typography gutterBottom>
        Flip
      </Typography>
      
      <Switch checked={flip}
              color="primary"
              onChange={(event, nextValue) => updateFlip(nextValue)}/>
    </FloatingBox>
  );
}

//tslint:disable-next-line:no-any
export const withTestController: (options: ControllerOptions) => DecoratorFunction<any> = (options: ControllerOptions) => storyFn => {
  return (
    <ControllerProvider options={options} storyFn={storyFn}/>
  );
};

const FloatingBox = styled(Box)`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 200px;
`;