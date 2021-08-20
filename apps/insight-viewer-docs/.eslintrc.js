const baseConfig = require('../../.eslintrc.js')

module.exports = {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      // Turn off rule that are not necessary in Next.js
      files: ['./**/*.ts', './**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
}
