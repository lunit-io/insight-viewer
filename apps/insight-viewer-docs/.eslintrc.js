const baseConfig = require('../../.eslintrc.js')

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:@next/next/recommended'],
}
