const baseConfig = require('../../jest.config.js')
const packageJson = require('./package')

module.exports = {
  ...baseConfig,
  name: packageJson.name,
  displayName: packageJson.name,
  roots: ['<rootDir>/src'],
  verbose: true,
  transformIgnorePatterns: ['/node_modules/(?!(ky))'],
}
