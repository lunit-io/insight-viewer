const { join } = require('path')

module.exports = {
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  webpack5: false,
  // Fix for:
  // You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
  // 참고: https://webman.pro/blog/how-to-setup-typescript-path-aliases-in-lerna-monorepo/
  // https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
  webpack: config => {
    // Let Babel compile outside of src/
    const tsRule = config.module.rules.find(
      rule => rule.test && rule.test.toString().includes('tsx|ts')
    )
    tsRule.include = undefined
    tsRule.exclude = /node_modules/

    // https://github.com/vercel/next.js/issues/6316
    config.optimization.minimize = false

    return {
      ...config,
      node: {
        fs: 'empty',
      },
    }
  },
}
