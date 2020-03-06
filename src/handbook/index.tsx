import { Handbook, page } from '@handbook/react';
import { globalStyle as insightViewerGlobaltyle } from '@lunit/insight-viewer';
import { globalStyle as componentsGlobalStyle } from '@lunit/opt-components';
import React from 'react';
import { render } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import './markdown.css';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: sans-serif;
  }
`;

const StyledHandbook = styled(Handbook)`
  > nav {
    position: fixed;
    width: 200px;
    padding: 20px;

    font-size: 12px;
    line-height: 150%;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      ul {
        padding-left: 20px;
      }
    }
  }

  > article {
    margin-left: 200px;
    padding: 20px;

    iframe {
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px;
    }
  }
`;

export const SampleGlobalStyle = createGlobalStyle`
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

const sampleTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#222232" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="manifest" href="manifest.json" />
    <title>API</title>
    <script src="cornerstone.js"></script>
    <script src="cornerstoneWADOImageLoader.js"></script>
    <script src="cornerstoneWebImageLoader.js"></script>
    <script src="dicomParser.js"></script>
    <link rel="stylesheet" href="fonts/proximanova/proximanova.css" />
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
  </body>
</html>
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <StyledHandbook>
        {{
          index: {
            Title1: page('./pages/Page1'),
            Title2: page('./pages/Page2'),
            Cate: {
              Gory: {
                Title3: page('./pages/Page3'),
              },
            },
            InsightViewer: page('@lunit/insight-viewer/__stories__/InsightViewer'),
            Annotation: page('@lunit/insight-viewer/__stories__/Annotation.Contour'),
          },
          sampleTemplate,
        }}
      </StyledHandbook>
    </div>
  );
}

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
