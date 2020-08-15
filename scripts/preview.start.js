const {start} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');

start({
  app: 'preview',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
});