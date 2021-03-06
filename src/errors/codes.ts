export enum Codes {
  'FATAL' = '\x1b[1m\x1b[31mð¥ FATAL\x1b[0m',
  'ERROR' = '\x1b[1m\x1b[31mâ ERROR\x1b[0m',
  'WARN' = '\x1b[1m\x1b[33mð WARN\x1b[0m',
  'INFO' = '\x1b[1m\x1b[36mð INFO\x1b[0m',
  'SUCCESS' = '\x1b[1m\x1b[32mâ SUCCESS\x1b[0m',
}

export type Code = keyof typeof Codes;
export type ErrorCode = 'FATAL' | 'ERROR' | 'WARN';
