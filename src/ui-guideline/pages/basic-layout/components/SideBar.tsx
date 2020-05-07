import { lunitDark, ScrollContainer, ScrollContainerProps } from '@lunit/insight-ui';
import React from 'react';
import styled from 'styled-components';
import { layout } from 'ui-guideline/pages/basic-layout/env';
import { CopyRight } from './CopyRight';

export interface SideBarProps extends ScrollContainerProps {
  className?: string;
}

export function SideBarBase({ ref, children, ...scrollContainerProps }: SideBarProps) {
  return (
    <ScrollContainer {...scrollContainerProps}>
      <CopyRight />
      {children}
      <div style={{ height: 50 }} />
    </ScrollContainer>
  );
}

export const SideBar = styled(SideBarBase)`
  width: ${layout.sidebarWidth}px;
  background-color: ${lunitDark.containers.sidebar.background};
  position: relative;

  > div {
    margin-bottom: 16px;
  }
`;
