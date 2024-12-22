export default {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coveragePathIgnorePatterns: [
    'types',
    'vite-env.d.ts',
    'config',
    'models/*',
    'mirage/*',
    'main.tsx',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
