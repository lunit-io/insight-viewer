import React, { ReactNode } from 'react';
import { Container } from './Container';
import { scalebarHeight } from '../env';
import { LowToHigh } from './LowToHigh';
import { Ticks } from './Ticks';

export interface Line {
  /** line width */
  lineWidth: number;
  /** step position */
  step: number;
  /** css color */
  color: string;
}

interface GrayScalebarProps {
  width: number;
  /** tick (하단 눈금) 갯수 */
  steps: number;

  /** scalebar (네모 영역) css color */
  backgroundColor: string;
  /** lines */
  lines: Line[];

  tickWidth?: number;
  tickHeight?: number;
  tickColor?: string;

  className?: string;
  children?: ReactNode;
}

export function GrayScalebar({
  width,
  steps,
  lines,
  backgroundColor,
  tickColor,
  tickWidth = 1,
  tickHeight = 7,
  className,
  children,
}: GrayScalebarProps) {
  const stepWidth: number = width / steps;

  return (
    <Container className={className}>
      <svg width={width} height={scalebarHeight + tickHeight}>
        <Ticks
          steps={steps}
          y={scalebarHeight}
          stepWidth={stepWidth}
          tickWidth={tickWidth}
          tickHeight={tickHeight}
          tickColor={tickColor || backgroundColor}
        />

        <rect x={0} y={0} width={width} height={scalebarHeight} fill={backgroundColor} />

        {lines.map(({ step, lineWidth: strokeWidth, color }) => {
          return (
            <line
              key={`step${step}`}
              x1={stepWidth * step}
              y1={0}
              x2={stepWidth * step}
              y2={scalebarHeight}
              strokeWidth={strokeWidth}
              stroke={color}
            />
          );
        })}
      </svg>

      {children}

      <LowToHigh width={width} style={{ top: scalebarHeight + tickHeight }} />
    </Container>
  );
}
