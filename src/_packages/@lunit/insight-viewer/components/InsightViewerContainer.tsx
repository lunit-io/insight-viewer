import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';

export interface InsightViewerContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width: number;
  height: number;
}

export const InsightViewerContainer = forwardRef<HTMLDivElement, InsightViewerContainerProps>(
  ({ width, height, children, style, ...divProps }, ref) => {
    return (
      <div
        ref={ref}
        {...divProps}
        style={{
          backgroundColor: '#000000',
          ...(style || {}),
          position: 'relative',
          width,
          height,
        }}
      >
        {children}
      </div>
    );
  },
);
