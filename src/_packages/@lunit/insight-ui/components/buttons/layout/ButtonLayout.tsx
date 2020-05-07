import React, { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

export interface ButtonLayoutProps {
  gap?: number;
  direction: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function ButtonLayout({ gap = 2, direction, ...divProps }: ButtonLayoutProps) {
  return direction === 'horizontal' ? (
    <HorizontalButtonLayout {...divProps} data-gap={gap} />
  ) : (
    <VerticalButtonLayout {...divProps} data-gap={gap} />
  );
}

export const Spacer = styled.div<{ 'data-size'?: number }>`
  width: ${({ 'data-size': size = 5 }) => size}px;
  height: ${({ 'data-size': size = 5 }) => size}px;
  min-width: 0;
  min-height: 0;
  flex: 0;
  margin: 0;
`;

export const VerticalButtonLayout = styled.div<{ 'data-gap': number }>`
  display: flex;
  flex-flow: column;

  > :not(:last-child) {
    margin-bottom: ${({ 'data-gap': gap }) => gap}px;
  }
`;

export const HorizontalButtonLayout = styled.div<{ 'data-gap': number }>`
  display: flex;
  width: 100%;

  > * {
    flex: 1;
  }

  > :not(:last-child) {
    margin-right: ${({ 'data-gap': gap }) => gap}px;
  }
`;
