import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  displayName: 'api',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/app/api/**/*.test.{js,ts}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.api.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)