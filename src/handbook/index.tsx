import { Handbook, HandbookConfig } from '@handbook/components';
import { insightViewerPages } from '@lunit/insight-viewer/__pages__';
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
  vscode: true,
  index: {
    'insight-viewer': insightViewerPages,
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
