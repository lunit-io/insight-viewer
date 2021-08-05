const CracoAlias = require('craco-alias')
const { getLoader, loaderByName } = require('@craco/craco')
const path = require('path')

const absolutePath = path.join(
  __dirname,
  '../../packages/osd-react-renderer/src'
)

module.exports = {
  webpack: {
    alias: {
      '@lunit/osd-react-renderer': absolutePath,
    },
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      )

      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include]
        match.loader.include = include.concat[absolutePath]
      }

      return webpackConfig
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        unsafeAllowModulesOutsideOfSrc: true,
        tsConfigPath: '../../tsconfig.base.json',
      },
    },
  ],
}
