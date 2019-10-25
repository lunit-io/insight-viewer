import React, { MouseEvent, SVGProps, useCallback } from 'react';

export interface PointPinProps extends SVGProps<SVGGElement> {
  x: number;
  y: number;
  label: string | null;
  onEnter: () => void;
  onLeave: () => void;
  onRemove: () => void;
}

export function PointPin({x, y, label, onEnter, onLeave, onRemove, ...gProps}: PointPinProps) {
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
            transform="translate(-8 -16)"/>
      
      {
        label &&
        <g transform="translate(0 -25)">
          <text strokeWidth={4} stroke="#000000">
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