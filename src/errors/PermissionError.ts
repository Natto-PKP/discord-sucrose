export default class PermissionError extends Error {
  constructor(public missing: string | string[], message = `Missing permissions: ${missing}`) {
    super(message);
    this.name = 'PermissionError';
  }
}
