import { ScrollContainer, ScrollContainerProps } from '@lunit/opt-components';
import React from 'react';
import styled from 'styled-components';

export interface SideBarProps extends ScrollContainerProps {
  width: number;
  className?: string;
}

export function SideBarBase({ width, ref, children, ...scrollContainerProps }: SideBarProps) {
  return <ScrollContainer {...scrollContainerProps}>{children}</ScrollContainer>;
}

export const SideBar = styled(SideBarBase)`
  width: ${({ width }) => width}px;
  background-color: #030a18;
  padding-bottom: 50px;
  position: relative;

  > div {
    margin-bottom: 16px;
  }
`;
