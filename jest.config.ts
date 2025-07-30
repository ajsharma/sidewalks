import type { Config } from 'jest'

const config: Config = {
  projects: [
    '<rootDir>/jest.config.client.ts',
    '<rootDir>/jest.config.api.ts',
  ],
}

export default config