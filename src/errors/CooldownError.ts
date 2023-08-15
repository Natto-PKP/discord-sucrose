import { type CooldownValue } from '../managers/CooldownManager';
import Cooldown, { type CooldownData } from '../structures/Cooldown';

export enum CooldownErrors {
  STACK_LIMIT_REACHED = 'stack limit reached',
  COOLDOWN_NOT_EXPIRED = 'cooldown not expired',
}

export default class CooldownError extends Error {
  constructor(
    public cooldown: Cooldown | CooldownData,
    public type: keyof typeof CooldownErrors,
    public value?: CooldownValue | null,
    message = CooldownErrors[type],
  ) {
    super(message);
  }
}
