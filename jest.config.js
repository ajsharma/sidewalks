module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/server'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'server/**/*.ts',
    '!src/**/*.d.ts',
    '!server/**/*.d.ts'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};