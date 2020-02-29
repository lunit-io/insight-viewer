import { posMapToImageData } from '@lunit/heatmap';
import data from '@lunit/heatmap/__stories__/posMap.sample.json';
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { withKnobs } from '@storybook/addon-knobs';
import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';

export default {
  title: 'heatmap',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle, withKnobs],
};

export const posMapToImageDataSample = () => {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement | null>(null);

  // AI에서 나온 posMap 결과를 ImageData로 변환한다
  const imageData = useMemo<ImageData>(() => {
    return posMapToImageData(data.engine_result.engine_result.pos_map, 0.1);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) throw new Error('<canvas> is null');
    const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('ctx is null');

    // ImageData를 Canvas Context에 그린다
    ctx.putImageData(imageData, 0, 0);
  }, [imageData]);

  return (
    <canvas
      ref={canvasRef}
      width={imageData.width}
      height={imageData.height}
      style={{
        width: imageData.width,
        height: imageData.height,
      }}
    />
  );
};

posMapToImageDataSample.story = {
  name: 'posMapToImageDataSample()',
};
