import { ErrorCode, Codes } from './codes';

export class SucroseError extends Error {
  public readonly date = new Date();

  public constructor(public readonly code: ErrorCode, public readonly content: string) {
    super(`${Codes[code]} :: ${content}`);
  }
}

export const SError = (code: ErrorCode, content: string) => new SucroseError(code, content);
