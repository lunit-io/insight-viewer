import { PaletteColor } from '@material-ui/core/styles/createPalette';
import React, { CSSProperties, ReactNode } from 'react';

export type SidebarPanelClassKeys = 'header' | 'icon' | 'title' | 'content';

export interface SidebarPanelProps {
  children: ReactNode | ((expanded: boolean) => ReactNode);
  color?: PaletteColor;
  expanded?: boolean;
  onChange?: (nextExapnded: boolean) => void;
  title: ReactNode | ((expanded: boolean) => ReactNode);
  icon?: ReactNode | ((expanded: boolean) => ReactNode);
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

export function SidebarPanel({}: SidebarPanelProps) {
  return <div>...</div>;
}
