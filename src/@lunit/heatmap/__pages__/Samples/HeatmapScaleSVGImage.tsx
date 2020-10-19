import { HeatmapScaleSVGImage } from '@lunit/heatmap';
import React from 'react';

export default () => {
  const width: number = 300;
  const height: number = 100;
  const threshold: number = 0.1;

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#000000" />
      <HeatmapScaleSVGImage width={width} height={height} threshold={threshold} />
    </svg>
  );
};
