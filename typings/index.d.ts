/**
 * @public
 */
export type LoggerOptions = { verbose: boolean, colored: boolean, console: Console };
  
/**
 * @public
 */
export type Callback<P = { }, R = unknown> = (params: P) => R | Promise<R>;