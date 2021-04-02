const {getBrowserslistQuery} = require('@rocket-scripts/browserslist');

module.exports = {
  presets: [[require.resolve('@rocket-scripts/react-preset/babelPreset'), {
    modules: false,
    targets: getBrowserslistQuery({cwd: process.cwd()}),
  }]],
  plugins: [require.resolve('@handbook/babel-plugin')],
};