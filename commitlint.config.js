module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['release', 'root', 'viewer', 'docs']],
    'scope-empty': [2, 'never'],
  },
}
