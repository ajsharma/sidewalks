const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'server/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!server/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Separate config for server tests
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.{test,spec}.{js,ts}'],
    },
  ],
}

module.exports = createJestConfig(customJestConfig)