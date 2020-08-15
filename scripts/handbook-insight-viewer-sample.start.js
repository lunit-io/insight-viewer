const {start} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');

start({
  app: 'handbook-insight-viewer-sample',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
});