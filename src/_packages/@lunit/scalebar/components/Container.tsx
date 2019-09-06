import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export function Container({style, children, ...divProps}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div {...divProps}
         style={{
           ...style,
           position: 'relative',
           display: 'inline-block',
         }}>
      {children}
    </div>
  );
}