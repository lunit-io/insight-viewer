import React, { ComponentType, DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

export interface PreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactElement;
  width?: string | number;
  height?: string | number;
}

function _Preview({ children, width = '100%', height = 400, style, ...divProps }: PreviewProps) {
  return children ? (
    <div {...divProps} style={{ ...style, width, height }}>
      {children}
    </div>
  ) : null;
}

export const Preview: ComponentType<PreviewProps> = styled(_Preview)`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 10px;
`;
