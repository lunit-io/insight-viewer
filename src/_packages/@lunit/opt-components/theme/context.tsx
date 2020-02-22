import { StylesProvider as MuiStylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import React, { ReactNode } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { theme } from './theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiStylesProvider injectFirst>
      <StyledComponentsThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StyledComponentsThemeProvider>
    </MuiStylesProvider>
  );
}
