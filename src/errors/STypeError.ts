import { SucroseError } from './SError';

export class SucroseTypeError extends SucroseError {
  constructor(
    public readonly prop: string,
    public readonly type: string,
    public readonly received: unknown,
  ) {
    super('ERROR', `"${prop}" must be type: ${type} (received: ${received})`);
  }
}
