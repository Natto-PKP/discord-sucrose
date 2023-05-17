import type { ContentReturn } from '../../typings';
import { SucroseError } from './SError';

export class SucroseInteractionError extends SucroseError {
  public constructor(message: string, public content: ContentReturn) {
    super('ERROR', message);
  }
}
