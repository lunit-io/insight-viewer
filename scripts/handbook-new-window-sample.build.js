const {build} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');

build({
  app: 'handbook-new-window-sample',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
});