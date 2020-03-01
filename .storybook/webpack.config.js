const { patchStorybookWebpackConfig } = require('react-zeroconfig');

module.exports = async ({ config }) => {
  patchStorybookWebpackConfig({ config });

  config.module.rules.push(
    {
      test: /\.stories\.(js|jsx)$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'javascript' },
        },
      ],
      enforce: 'pre',
    },
    {
      test: /\.stories\.(ts|tsx)$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    },
  );

  return config;
};
