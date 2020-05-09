import { MDXCodeBlock } from '@handbook/code-block';
import {
  globalStyle as componentsGlobalStyle,
  lunitDarkTheme,
  ScreenFitContainer,
  ThemeProvider,
} from '@lunit/insight-ui';
import { globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import { StylesProvider } from '@material-ui/styles';
import { SnackbarProvider } from '@ssen/snackbar';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Navigation } from 'ui-guideline/components/layout/Navigation';
import { routeConfig } from 'ui-guideline/route/routeConfig';

export const GlobalStyle = createGlobalStyle`
  ${componentsGlobalStyle};
  ${insightViewerGlobaltyle};
  
  html {
    font-size: 14px;
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

const components = {
  pre: (props) => <div {...props} />,
  code: MDXCodeBlock,
};

export function App() {
  return (
    <SnackbarProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={lunitDarkTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Layout>
              <Switch>
                {routeConfig.map(({ id, component }) => (
                  <Route key={id} path={`/${id}`} component={component} />
                ))}
                <Redirect to={`/${routeConfig[0].id}`} />
              </Switch>
              <Navigation routeConfig={routeConfig} />
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </SnackbarProvider>
  );
}

const Layout = styled(ScreenFitContainer)`
  display: flex;
  flex-direction: column;

  > :first-child {
    flex: 1;
    min-height: 0;
  }
`;
