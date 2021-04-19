module.exports = {
  '{apps,packages}/**/*.ts?(x)': [
    () => 'yarn run tsc --p tsconfig.lint-staged.json',
    `yarn run eslint --max-warnings=0 --cache`,
    `yarn run prettier --write`,
  ],
  '{apps,packages}/**/*.js?(x)': [
    'yarn run eslint --cache',
    'yarn run prettier --write',
  ],
}
