import { Box, Slider, Typography } from '@material-ui/core';
import { StoryDecorator } from '@storybook/react';
import React, { createElement, isValidElement, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CornerstoneBulkImage } from '../../image/types';

interface ControllerProps {
  image: CornerstoneBulkImage;
}

function Controller({image}: ControllerProps) {
  const [displayIndex, setDisplayIndex] = useState<number>(image.getIndex());
  const numImages = useMemo<number>(() => image.length() - 1, [image]);
  
  useEffect(() => {
    const displayIndexSubscription = image.index.subscribe(setDisplayIndex);
    
    return () => {
      displayIndexSubscription.unsubscribe();
    };
  }, [image]);
  
  return (
    <FloatingBox>
      <Typography gutterBottom>
        Image ({displayIndex} / {numImages})
      </Typography>
      
      <Slider
        value={displayIndex}
        min={0}
        max={numImages}
        onChange={(event, nextValue) => image.goto(nextValue as number)}/>
    </FloatingBox>
  );
}

export const withSeriesImageController: (image: CornerstoneBulkImage) => StoryDecorator = image => storyFn => {
  const story = storyFn();
  
  return (
    <>
      {
        typeof story === 'function'
          ? createElement(story)
          : isValidElement(story)
          ? story
          : <div>story is not valid element</div>
      }
      <Controller image={image}/>
    </>
  );
};

const FloatingBox = styled(Box)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 200px;
`;