import type { JestConfigWithTsJest } from 'ts-jest';

export default <JestConfigWithTsJest>{ 
  verbose: false,
  transform: {
    '^.+\\.ts$': [
      'ts-jest', 
      { 
        tsconfig: { 
          types: ["jest", "node"],
          resolveJsonModule: true,
          esModuleInterop: true,
        },
      },
    ],
  },
};