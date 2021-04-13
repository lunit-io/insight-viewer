module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './**/tsconfig.json',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      "version": "latest",
    },
  },
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'no-extra-semi': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never' },
    ],
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    }
  ]
}
