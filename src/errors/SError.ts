import type { ErrorCode } from './codes';

export class SucroseError extends Error {
  public readonly date = new Date();

  public constructor(public readonly code: ErrorCode, message: string) {
    super(message);
  }
}

export const SError = (code: ErrorCode, message: string) => new SucroseError(code, message);
