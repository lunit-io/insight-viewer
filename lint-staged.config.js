const { ESLint } = require('eslint')
const filterAsync = require('node-filter-async').default

const eslintCli = new ESLint()

const removeIgnoredFiles = async (files) => {
  const filteredFiles = await filterAsync(files, async (file) => {
    const isIgnored = await eslintCli.isPathIgnored(file)
    return !isIgnored
  })
  return filteredFiles.join(' ')
}

module.exports = {
  '{apps,packages}/**/*.ts?(x)': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [
      'yarn run tsc --p tsconfig.lint-staged.json',
      `yarn run eslint --max-warnings=0 --cache ${filesToLint}`,
      `yarn run prettier --write ${filesToLint}`,
    ]
  },
  '{apps,packages}/**/*.js?(x)': ['yarn run eslint --cache', 'yarn run prettier --write'],
}
