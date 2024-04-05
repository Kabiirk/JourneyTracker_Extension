module.exports = {
    testMatch: ['<rootDir>/src/__puppeteerTests__/**'],
    verbose: true,
    "testTimeout": 1000000,
    preset: 'ts-jest',
    // preset: 'jest-puppeteer',
    // testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/src/__mocks__/fileMock.ts',
      // '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/vendor/**'],
    // collectCoverageFrom: ['**/src/components/**','!**/node_modules/**', '!**/vendor/**'],
  
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    };