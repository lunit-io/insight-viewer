import React from 'react';

export interface TicksProps {
  steps: number;
  y: number;
  stepWidth: number;
  tickWidth: number;
  tickHeight: number;
  tickColor: string;
}

export function Ticks({steps, y, tickWidth, stepWidth, tickHeight, tickColor}: TicksProps) {
  return (
    <>
      {
        Array.from({length: steps + 1}, (_, i) => {
          const x: number = Math.floor(stepWidth * i);
          
          return (
            <line key={'tick_' + i}
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + tickHeight}
                  strokeWidth={tickWidth}
                  stroke={tickColor}/>
          );
        })
      }
    </>
  );
}