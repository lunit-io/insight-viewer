import { useHeatmapScaleImageURI } from '@lunit/heatmap';
import React from 'react';

export default () => {
  const width: number = 300;
  const height: number = 100;
  const threshold: number = 0.1;

  const dataUri: string | null = useHeatmapScaleImageURI({
    width,
    height,
    threshold,
  });

  return dataUri ? <img src={dataUri} style={{ width, height, backgroundColor: '#000000' }} alt="test" /> : null;
};
