import type { Condition } from '../../typings';
import { SucroseError } from './SError';

export class SucroseConditionError<C = Condition> extends SucroseError {
  public constructor(
    message: string,
    public conditions: C | C[],
  ) {
    super('ERROR', message);
  }
}
