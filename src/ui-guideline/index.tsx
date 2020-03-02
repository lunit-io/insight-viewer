import { installWADOImageLoader } from '@lunit/insight-viewer';
import React from 'react';
import { render } from 'react-dom';
import { App } from './app';

installWADOImageLoader();

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
