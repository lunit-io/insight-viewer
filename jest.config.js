module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  roots: [
    '<rootDir>',
  ],
  testMatch: [
    "**/spec/**/*.+(ts|tsx|js|jsx)",
  ],
}
