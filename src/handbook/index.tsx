import { Handbook, HandbookConfig } from '@handbook/components';
import { handbookSourcePages } from '@handbook/source/__pages__';
import { heatmapPages } from '@lunit/heatmap/__pages__';
import { insightViewerPages } from '@lunit/insight-viewer/__pages__';
import { isComplexPolygonPages } from '@lunit/is-complex-polygon/__pages__';
import { isIntersectionPages } from '@lunit/is-intersection/__pages__';
import { isPolygonAreaGreaterThanAreaPages } from '@lunit/is-polygon-area-greater-than-area/__pages__';
import { newWindowPages } from '@lunit/new-window/__pages__';
import { optControlIcons } from '@lunit/opt-control-icons/__pages__';
import { useDialogPages } from '@lunit/use-dialog/__pages__';
import { useControlPages } from '@lunit/use-opt-control/__pages__';
import { useResetTimePages } from '@lunit/use-reset-time/__pages__';
import { useShortcutPages } from '@lunit/use-shortcut/__pages__';
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
    branch: 'master',
  },
  vscode: true,
  index: {
    handbook: handbookSourcePages,
    heatmap: heatmapPages,
    'is-intersection': isIntersectionPages,
    'is-complex-polygon': isComplexPolygonPages,
    'is-polygon-area-greater-than-area': isPolygonAreaGreaterThanAreaPages,
    'insight-viewer': insightViewerPages,
    'new-window': newWindowPages,
    'opt-control-icons': optControlIcons,
    'use-dialog': useDialogPages,
    'use-opt-control': useControlPages,
    'use-reset-time': useResetTimePages,
    'use-shortcut': useShortcutPages,
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
