const { ESLint } = require('eslint')

const eslintCli = new ESLint()

module.exports = {
  '{apps,packages}/**/*.ts?(x)': [
    'yarn run eslint --max-warnings=0 --cache --debug',
    'yarn run prettier --write',
  ],
  '{apps,packages}/**/*.js?(x)': [
    'yarn run eslint --cache',
    'yarn run prettier --write',
  ],
}
