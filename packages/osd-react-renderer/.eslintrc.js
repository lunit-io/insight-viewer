module.exports = {
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': ['off'],
    'no-param-reassign': [
      'error',
      // { props: true, ignorePropertyModificationsForRegex: ['acc', 'Acc$'] },
      {
        props: true,
        ignorePropertyModificationsForRegex: ['handlers', 'Handlers$'],
      },
    ],
  },
}
