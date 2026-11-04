import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Next.js resolves this marker at build time; Jest needs a stub
    '^server-only$': '<rootDir>/test/stubs/empty.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);
