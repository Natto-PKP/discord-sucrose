/* eslint-disable max-classes-per-file */
import EventEmitter from 'events';
import path from 'path';
import {
  createWriteStream, existsSync, lstatSync, mkdirSync,
} from 'fs';
import { Console } from 'console';
import { Code, Codes } from '../errors/codes';
import { SucroseError } from '../errors';

import type * as Types from '../../typings';

const styles = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  colors: {
    black: { font: '\x1b[30m', background: '\x1b[40m' },
    red: { font: '\x1b[31m', background: '\x1b[41m' },
    green: { font: '\x1b[32m', background: '\x1b[42m' },
    yellow: { font: '\x1b[33m', background: '\x1b[43m' },
    blue: { font: '\x1b[34m', background: '\x1b[44m' },
    magenta: { font: '\x1b[35m', background: '\x1b[45m' },
    cyan: { font: '\x1b[36m', background: '\x1b[46m' },
    white: { font: '\x1b[37m', background: '\x1b[47m' },
    gray: { font: '\x1b[38m', background: '\x1b[48m' },
  },
};

const now = Date.now();
const colorValues = [
  styles.colors.red,
  styles.colors.green,
  styles.colors.yellow,
  styles.colors.blue,
  styles.colors.magenta,
  styles.colors.cyan,
];
const colorKeys = Object.keys(styles.colors);
const styleKeys = Object.keys(styles);
styleKeys.pop();

export default class Logger extends EventEmitter implements Types.Logger {
  public console = console;

  public directory: Console | null = null;

  constructor(private options: Types.LoggerOptions) {
    super();

    if (options.directory) {
      const to = path.join(process.cwd(), 'logs');
      if (!existsSync(to) || !lstatSync(to).isDirectory()) mkdirSync(to);

      this.directory = new Console({
        stdout: createWriteStream(path.join(to, `${now}-output.log`)),
        stderr: createWriteStream(path.join(to, `${now}-error.log`)),
      });
    }
  }

  static style(str: string, ...formats: Types.LoggerLogFormat[]) {
    let base = str;
    let pre = '';

    formats.forEach((format) => {
      if (format === 'rainbow') {
        const characters = str.split('');
        base = characters.reduce((acc, char) => {
          if (/\s/.test(char)) return acc + char;
          const randomColor = colorValues[Math.floor(Math.random() * colorValues.length)].font;
          return acc + randomColor + char + styles.reset;
        }, '');
      } else {
        const [style, type] = format.split('-');
        if (colorKeys.includes(style)) {
          const colorType = (['bg', 'background'].includes(type) && 'background') || 'font';
          pre += styles.colors[style as keyof typeof styles['colors']][colorType];
        } else if (styleKeys.includes(style)) pre += styles[style as keyof typeof styles];
      }
    });

    return pre + base + styles.reset;
  }

  static clear() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }

  /**
   * get current date formatted
   *
   * @param format - allow to format date (default true)
   */
  static time(format = true): string | Date {
    const today = new Date();
    if (!format) return today;

    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
  }

  /**
   * write a error in consoles
   */
  public error(code: Code, content: string | Error, options?: Types.LoggerErrorOptions): void {
    const useColor = typeof options?.color === 'boolean' ? options.color : true;
    const addTime = typeof options?.time === 'boolean' ? options.time : true;
    const verbose = typeof options?.verbose === 'boolean' || this.options.verbose ? options?.verbose || this.options.verbose : true;
    let withoutColor = <string | Error>'';
    let withColor = <string | Error>'';

    if (addTime) {
      let time = Logger.time(true);
      withoutColor += `${time} `;
      if (useColor) time = styles.colors.gray.font + time + styles.reset;
      withColor += `${time} `;
    }

    const codeFormat = Codes[code];
    if (codeFormat) {
      if (useColor) withColor += `${codeFormat} `;
      else withColor += `${code} `;
      withoutColor += `${code} `;
    }

    if (content instanceof Error) {
      const withColorError = new Error(content.message);
      withColorError.message = withColor + content.message as string;
      withColor = withColorError;
      const withoutColorError = new Error(content.message);
      withoutColorError.message = withoutColor + content.message as string;
      withoutColor = withoutColorError;
    } else {
      withColor += content;
      withoutColor += content;
    }

    this.directory?.error(withoutColor);
    this.console.error((!verbose && withColor instanceof Error && withColor.message) || withColor);
    this.emit('error', content);
    this.emit('raw', content);
  }

  /**
   * Generate loading bar
   *
   * @param total
   */
  static* loading(total: number): Generator<void, void, { index: number; message: string; }> {
    while (true) {
      const { index, message } = yield;
      const percent = Math.ceil((index / total) * 100 * 0.20);
      Logger.clear();
      process.stdout.write(`[${'.'.repeat(percent).padEnd(20)}] ${message}`);
    }
  }

  public give(code: Code, content: Error | string) {
    if (code === 'FATAL' || code === 'ERROR' || code === 'WARN') {
      this.error(code, content);
    } else {
      const message = content instanceof Error ? content.message : content;
      this.write(message, { code });
    }
  }

  /**
   * handle errors array
   *
   * @param errors - array or errors to log
   */
  public handle(...errors: Error[]): void {
    errors.forEach((err) => {
      if (err instanceof SucroseError) this.give(err.code, err);
      else this.give('ERROR', err);
    });
  }

  /**
   * write a table in consoles
   */
  public table(content: object | unknown[]): void {
    Logger.clear();
    this.console.table(content);
    this.directory?.table(content);
    this.emit('output', content);
    this.emit('raw', content);
  }

  /**
   * write a message in consoles
   */
  public write(message: string, options?: Types.LoggerWriteOptions): void {
    const useColor = typeof options?.color === 'boolean' ? options.color : true;
    const addTime = typeof options?.time === 'boolean' ? options.time : true;
    let withoutColor = '';
    let withColor = '';

    if (addTime) {
      let time = Logger.time(true);
      withoutColor += `${time} `;
      if (useColor) time = styles.colors.gray.font + time + styles.reset;
      withColor += `${time} `;
    }

    if (options?.code) {
      const codeFormat = Codes[options.code];
      if (codeFormat) {
        if (useColor) withColor += `${codeFormat} `;
        else withColor += `${options.code} `;
        withoutColor += `${options.code} `;
      }
    }

    withColor += message;
    withoutColor += message;

    this.directory?.log(withoutColor);
    this.console.log(withColor);
    this.emit('output', message);
    this.emit('raw', message);
  }
}
