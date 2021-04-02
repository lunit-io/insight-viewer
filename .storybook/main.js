const {webpackFinal} = require('@rocket-scripts/web/storybook');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  webpackFinal: webpackFinal({}),
};