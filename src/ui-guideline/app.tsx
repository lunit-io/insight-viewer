import { globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import { MDXCodeBlock } from '@lunit/mdx-code-block';
import { globalStyle as componentsGlobalStyle, ThemeProvider } from '@lunit/opt-components';
import { MDXProvider } from '@mdx-js/react';
import { SnackbarProvider } from '@ssen/snackbar';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { RouteContents } from './components/layout/RouteContents';
import { RouteNavigation } from './components/layout/RouteNavigation';

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

const components = {
  pre: props => <div {...props} />,
  code: MDXCodeBlock,
};

export function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider>
        <GlobalStyle />
        <HashRouter>
          <div>
            <div>
              <RouteNavigation />
            </div>
            <div>
              <MDXProvider components={components}>
                <RouteContents />
              </MDXProvider>
            </div>
            <div style={{ marginTop: 30 }}>
              <RouteNavigation />
            </div>
          </div>
        </HashRouter>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
