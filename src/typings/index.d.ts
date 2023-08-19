/**
 * @public
 */
export type Callback<P = { }, R = unknown> = (params: P) => R | Promise<R>;
