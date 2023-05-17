import type { ContentReturn, Permission } from '../../typings';
import { SucroseError } from './SError';

export class SucrosePermissionError extends SucroseError {
  public constructor(
    message: string,
    public content: ContentReturn,
    public permission: Permission,
  ) {
    super('ERROR', message);
  }
}
