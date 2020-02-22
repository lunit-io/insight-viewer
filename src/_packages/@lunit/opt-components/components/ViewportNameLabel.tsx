import React from 'react';

export interface ViewportLabelProps {
  children: string;
  width?: number;
}

const height: number = 17;
const y: number = 13;

export function ViewportNameLabel({ children, width = 100 }: ViewportLabelProps) {
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
        x={5}
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
      <text x={5} y={y} fill="#ffffff" width={width} height={height}>
        {children}
      </text>
    </svg>
  );
}
