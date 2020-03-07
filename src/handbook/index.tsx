import { page } from '@handbook/core';
import { Handbook, HandbookConfig } from '@lunit/handbook';
import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import './markdown.css';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: sans-serif;
  }
`;

const handbookConfig: HandbookConfig = {
  github: {
    repo: 'lunit-io/frontend-components',
    branch: 'feature/web-and-3d-loaders',
  },
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
};

function App() {
  return (
    <div>
      <GlobalStyle />
      <Handbook config={handbookConfig} />
    </div>
  );
}

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
