import React, { cloneElement, ReactElement, ReactNode, SVGProps } from 'react';
import { Container } from './Container';
import { scalebarHeight } from '../env';
import { LowToHigh } from './LowToHigh';
import { Ticks } from './Ticks';

interface ColorScalebarProps {
  width: number;
  /** tick (하단 눈금) 갯수 */
  steps: number;
  
  scaleImage: ReactElement<SVGProps<SVGImageElement>>;
  
  tickWidth?: number;
  tickHeight?: number;
  tickColor: string;
  
  className?: string;
  children?: ReactNode;
}

export function ColorScalebar({width, steps, scaleImage, tickColor, tickWidth = 1, tickHeight = 7, className, children}: ColorScalebarProps) {
  const stepWidth: number = width / steps;
  
  return (
    <Container className={className}>
      <svg width={width} height={scalebarHeight + tickHeight}>
        <Ticks steps={steps}
               y={scalebarHeight}
               stepWidth={stepWidth}
               tickWidth={tickWidth}
               tickHeight={tickHeight}
               tickColor={tickColor}/>
        
        <rect x={0}
              y={0}
              width={width}
              height={scalebarHeight}
              fill={tickColor}/>
        
        <rect x={1}
              y={1}
              width={width - 2}
              height={scalebarHeight - 2}
              fill="#000000"/>
        
        {
          cloneElement(scaleImage, {
            x: 1,
            y: 1,
            width: width - 2,
            height: scalebarHeight - 2,
          })
        }
      </svg>
      
      {children}
      
      <LowToHigh width={width}
                 style={{top: scalebarHeight + tickHeight}}/>
    </Container>
  );
}