import type { Config } from '@jest/types';

export default <Config.InitialOptions>{
  moduleFileExtensions: ['js', 'ts', 'd.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};
