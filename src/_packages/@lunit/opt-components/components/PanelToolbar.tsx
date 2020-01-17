import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { PANEL_HEADER_HEIGHT } from './Panel';

export interface PanelToolbarProps {
  children: ReactNode;
  className?: string;
}

export function PanelToolbarBase({children, className = ''}: PanelToolbarProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const PanelToolbar = styled(PanelToolbarBase)`
  position: absolute;
  height: ${PANEL_HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  top: 0;
  padding-top: 1px;
  right: 12px;
`;