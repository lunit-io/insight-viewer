import { StylesProvider as MuiStylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import React, { ReactNode } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { theme } from './theme';

export function ThemeProvider({ children, injectFirst = true }: { children: ReactNode; injectFirst?: boolean }) {
  return (
    <MuiStylesProvider injectFirst={injectFirst}>
      <StyledComponentsThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StyledComponentsThemeProvider>
    </MuiStylesProvider>
  );
}
