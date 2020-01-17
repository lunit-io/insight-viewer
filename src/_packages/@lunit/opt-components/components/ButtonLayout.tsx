import React, { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonLayoutProps {
  gap?: number;
  direction: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function ButtonLayoutBase({className = '', children, style}: ButtonLayoutProps) {
  return (
    <div className={className}
         style={style}>
      {children}
    </div>
  );
}

const verticalLayout = ({gap = 2}: ButtonLayoutProps) => css`
  display: flex;
  flex-flow: column;
  
  > :not(:last-child) {
    margin-bottom: ${gap}px;
  }
`;

const horizontalLayout = ({gap = 2}: ButtonLayoutProps) => css`
  display: flex;
  width: 100%;
  
  > * {
    flex: 1;
  }
  
  > :not(:last-child) {
    margin-right: ${gap}px;
  }
`;

export const ButtonLayout = styled(ButtonLayoutBase)`
  ${({direction}) => direction === 'horizontal' ? horizontalLayout : verticalLayout};
`;