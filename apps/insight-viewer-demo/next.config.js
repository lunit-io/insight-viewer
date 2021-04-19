module.exports = {
  assetPrefix: './',
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
}
