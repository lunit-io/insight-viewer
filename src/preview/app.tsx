import { globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import Basic from '@lunit/insight-viewer/__pages__/Components/ContourDrawer/Basic';
import {
  globalStyle as componentsGlobalStyle,
  ThemeProvider,
} from '@lunit/opt-components';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${componentsGlobalStyle};
  ${insightViewerGlobaltyle};
  
  html {
    font-size: 14px;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 20px 50px;
  }
`;

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Basic />
    </ThemeProvider>
  );
}
