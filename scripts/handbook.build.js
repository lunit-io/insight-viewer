const {build} = require('@rocket-scripts/web');
const babelLoaderOptions = require('./babelLoaderOptions');
const webpackConfig = require('./webpackConfig');

build({
  app: 'handbook',
  staticFileDirectories: [
    '{cwd}/public',
    '{cwd}/src/@lunit/insight-viewer/public',
  ],
  babelLoaderOptions,
  webpackConfig,
});