module.exports = {
  '{apps,packages}/**/*.ts?(x)': [
    () => 'yarn run tsc --p tsconfig.lint-staged.json',
    'yarn run eslint --cache',
    'yarn run prettier --write',
  ],
  '{apps,packages}/**/*.js?(x)': ['eslint --cache', 'prettier --write'],
}
