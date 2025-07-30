import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  displayName: 'client',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/app/**/*.test.{js,jsx,ts,tsx}', '<rootDir>/src/components/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/src/app/api/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.client.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)