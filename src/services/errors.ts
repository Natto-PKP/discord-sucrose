/** Types */
import '../../typings/errors';

class SucroseTypeError extends TypeError {
  public constructor(parameter: string, type: string, received: unknown) {
    const message = `${parameter} must be a ${type} (received: ${received})`;
    super(message);
  }
}

class SucroseError extends Error {
  public constructor(public code: Code, message: Message) {
    super(Messages[message]);
  }
}

export function STypeError(parameter: string, type: string, received: unknown): SucroseTypeError {
  return new SucroseTypeError(parameter, type, received);
}

export function SError(code: Code, message: Message): SucroseError {
  return new SucroseError(code, message);
}
