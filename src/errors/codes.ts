export enum Codes {
  'FATAL' = '\x1b[1m\x1b[31m🔥  FATAL\x1b[0m',
  'ERROR' = '\x1b[1m\x1b[31m✖  ERROR\x1b[0m',
  'WARN' = '\x1b[1m\x1b[33m🔔   WARN\x1b[0m',
  'INFO' = '\x1b[1m\x1b[36m🔎   INFO\x1b[0m',
  'SUCCESS' = '\x1b[1m\x1b[32m✔ SUCCESS\x1b[0m',
}

export type Code = keyof typeof Codes;
export type ErrorCode = 'FATAL' | 'ERROR' | 'WARN';
