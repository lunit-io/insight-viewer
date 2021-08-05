const CracoAlias = require('craco-alias')
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@lunit/osd-react-renderer': path.resolve(
        __dirname,
        '../../packages/osd-react-renderer/src'
      ),
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
