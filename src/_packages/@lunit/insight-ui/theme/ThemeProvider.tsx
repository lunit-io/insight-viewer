import { InsightTheme } from '@lunit/insight-ui/theme/types';
import { ThemeProvider as MuiThemeProvider, useTheme } from '@material-ui/styles';
import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

export interface ThemeProviderProps {
  children: ReactNode;
  theme: InsightTheme;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const outerTheme = useTheme();
  const innerTheme = useMemo(() => {
    return outerTheme
      ? {
          ...outerTheme,
          ...theme,
        }
      : theme;
  }, [outerTheme, theme]);

  return (
    <StyledComponentsThemeProvider theme={innerTheme}>
      <MuiThemeProvider theme={innerTheme}>{children}</MuiThemeProvider>
    </StyledComponentsThemeProvider>
  );
}
