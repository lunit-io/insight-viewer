import React, { ComponentType, MouseEvent, SVGProps, useCallback } from 'react';
import styled from 'styled-components';

export interface PointPinProps extends SVGProps<SVGGElement> {
  x: number;
  y: number;
  label: string | null;
  onEnter: () => void;
  onLeave: () => void;
  onRemove: () => void;
}

function PointPinBase({x, y, label, onEnter, onLeave, onRemove, ...gProps}: PointPinProps) {
  const onClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    
    onRemove();
  }, [onRemove]);
  
  return (
    <g {...gProps}
       transform={`translate(${x} ${y})`}
       onMouseEnter={onEnter}
       onMouseLeave={onLeave}
       onClick={onClick}>
      
      <circle cx={0}
              cy={0}
              r={4}/>
      
      <path d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
            transform="translate(-8 -16)"
            data-border="border"/>
      
      <path d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
            transform="translate(-8 -16)"/>
      
      {
        label &&
        <g transform="translate(0 -25)">
          <text>
            {label}
          </text>
          <text>
            {label}
          </text>
        </g>
      }
    </g>
  );
}

export const PointPin: ComponentType<PointPinProps> = styled(PointPinBase)`
  cursor: pointer;
  
  color: var(--pin-color, #ffffff);
  
  &[data-focused] {
    color: var(--pin-focused-color, rgb(255,194,17))
  }
  
  > circle {
    fill: #000000;
  }
  
  > path {
    fill: currentColor;
    
    &[data-border] {
      stroke-width: 4px;
      stroke: #000000;
    }
  }
  
  > g {
    text {
      text-anchor: middle;
      font-size: 14px;
      font-weight: bold;
    }
  
    text:first-child {
      stroke-width: 4px;
      stroke: #000000;
    }
    
    text:last-child {
      fill: currentColor;
    }
  }
` as ComponentType<PointPinProps>;