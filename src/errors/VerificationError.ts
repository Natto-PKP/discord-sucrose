export default class VerificationError extends Error {
  constructor(public provided: unknown, public expected: unknown, message = `Expected ${provided} to be ${expected}`) {
    super(message);
    this.name = 'VerificationError';
  }
}
