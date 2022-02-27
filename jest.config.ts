import { defaults } from 'jest-config';

export default {
  preset: 'ts-jest',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'd.ts'],
  verbose: true,
};
