import type { Cooldown } from '../../typings';
import { SucroseError } from './SError';

export class SucroseCooldownError extends SucroseError {
  public constructor(
    message: string,
    public cooldown: Cooldown,
    public key: string,
  ) {
    super('ERROR', message);
  }
}
