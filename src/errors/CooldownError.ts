export class CooldownError extends Error {
  constructor(public remaining: number, message = `You are on cooldown for ${remaining} more milliseconds`) {
    super(message);
    this.name = 'CooldownError';
  }
}
