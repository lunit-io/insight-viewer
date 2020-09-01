import { CornerstoneRenderData } from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

export interface ViewportInfoLabelProps {
  cornerstoneRenderData: CornerstoneRenderData | null;
  width?: number;
}

const height: number = 17;
const y: number = 13;

export function ViewportInfoLabel({
  cornerstoneRenderData,
  width = 400,
}: ViewportInfoLabelProps) {
  const children = useMemo(() => {
    if (!cornerstoneRenderData) return null;

    return (
      <>
        <tspan fill="#8694B1">ZOOM</tspan>
        &nbsp; &nbsp;
        <tspan fill="#ffffff">
          {cornerstoneRenderData.viewport.scale.toFixed(3)}
        </tspan>
        &nbsp; &nbsp; &nbsp;
        <tspan fill="#8694B1">WW / WL</tspan>
        &nbsp; &nbsp;
        <tspan fill="#ffffff">
          {cornerstoneRenderData.viewport.voi.windowWidth} /{' '}
          {cornerstoneRenderData.viewport.voi.windowCenter}
        </tspan>
        &nbsp;
      </>
    );
  }, [cornerstoneRenderData]);

  return (
    <svg
      width={width}
      height={height}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        fontSize: 12,
      }}
    >
      <text
        textAnchor="end"
        x={width}
        y={y}
        width={width}
        height={height}
        stroke="#000000"
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {children}
      </text>
      <text textAnchor="end" x={width} y={y} width={width} height={height}>
        {children}
      </text>
    </svg>
  );
}
