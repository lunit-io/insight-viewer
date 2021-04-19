module.exports = {
  assetPrefix: process.env.HOST,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/basic': { page: '/basic' },
    }
  },
  env: {
    HOST: process.env.HOST,
  },
}
