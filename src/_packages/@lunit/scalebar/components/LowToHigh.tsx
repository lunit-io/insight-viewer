import React, { CSSProperties, SVGProps } from 'react';

interface LowToHighProps extends SVGProps<SVGSVGElement> {
  width: number;
}

function trianglePath(x: number, y: number, width: number, height: number): string {
  return `${x},${y + height / -2} ${x + width},${y} ${x},${y + height / 2}`;
}

const textStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 200,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.2,
  letterSpacing: 2,
  color: '#ffffff',
};

const textStyleEnd: CSSProperties = {
  ...textStyle,
  textAlign: 'right',
};

export function LowToHigh({ width, style, ...svgProps }: LowToHighProps) {
  return (
    <svg
      {...svgProps}
      width={width}
      height={20}
      style={{
        ...style,
        position: 'absolute',
        left: 0,
      }}
    >
      <text x={0} y={15} fill="#ffffff" style={textStyle}>
        LOW
      </text>

      <line x1={40} y1={11} x2={width - 50} y2={11} stroke="#ffffff" strokeWidth={1} />

      <polygon points={trianglePath(width - 50, 11, 5, 5)} fill="#ffffff" />

      <text x={width} y={15} fill="#ffffff" style={textStyleEnd} textAnchor="end">
        HIGH
      </text>
    </svg>
  );
}
