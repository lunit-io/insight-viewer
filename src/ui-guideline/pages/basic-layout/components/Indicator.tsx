import { HeatmapScaleSVGImage } from '@lunit/heatmap';
import React, { SVGProps } from 'react';

interface IndicatorProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  heatmapWidth?: number;
  threshold: number;
}

export function Indicator({ width = 600, height = 24, heatmapWidth = 351, ...svgProps }: IndicatorProps) {
  return (
    <svg {...svgProps} width={width} height={height}>
      <text textAnchor="end" x={width - heatmapWidth - 10} y={height / 2 + 4} fontSize={13} fill="#ffffff">
        HEATMAP COLOR INDICATOR
      </text>

      <rect x={width - heatmapWidth} width={heatmapWidth} height={height} fill="#000000" />

      <HeatmapScaleSVGImage x={width - heatmapWidth} threshold={0.1} width={heatmapWidth} height={height} />
    </svg>
  );
}
