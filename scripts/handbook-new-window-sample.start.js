const {start} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');

start({
  app: 'handbook-new-window-sample',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
});