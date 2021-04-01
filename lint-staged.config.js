module.exports = {
  '{apps,packages}/**/*.ts?(x)': [
    () => 'tsc -p tsconfig.lint-staged.json',
    'eslint --cache',
    'prettier --write',
  ],
  '{apps,packages}/**/*.js?(x)': ['eslint --cache', 'prettier --write'],
}
