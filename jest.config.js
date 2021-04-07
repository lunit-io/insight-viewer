module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  },
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: [
    "**/*.spec.+(ts|tsx|js|jsx)",
  ],
  projects: ['<rootDir>'],
}
