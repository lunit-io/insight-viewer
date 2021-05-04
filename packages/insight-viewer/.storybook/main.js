const path = require('path')

module.exports = {
  stories: [
    '../doc/**/*.stories.mdx',
    '../doc/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
],

  // Fix for: 'Module not found: Error: Can't resolve 'fs' in '/frontend-components/node_modules/cornerstone-wado-image-loader/dist'
  // https://stackoverflow.com/questions/53325876/storyshot-for-storybook-vue-broken-with-error-module-not-found-error-cant-res/64246289#64246289
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'fs': path.resolve(__dirname, 'fsMock.js'),
      '@emotion/core': '@emotion/react',
      'emotion-theming': '@emotion/react',
    };
    return config
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
