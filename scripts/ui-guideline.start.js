const {start} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');

start({
  app: 'ui-guideline',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
});