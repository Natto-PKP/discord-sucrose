import type { ContentReturn, MessageReturn } from '../../typings';
import { SucroseError } from './SError';

export class SucroseInteractionError extends SucroseError {
  public constructor(message: string, public content: MessageReturn) {
    super('ERROR', message);
  }
}

export const SInteractionError = (message: string, content: ContentReturn) => {
  const err = new SucroseInteractionError(message, content as MessageReturn);
  return err;
};
