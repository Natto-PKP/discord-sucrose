/* eslint-disable no-console */

import { Console } from 'console';
import {
  mkdirSync,
  existsSync,
  lstatSync,
  createWriteStream,
} from 'fs';
import path from 'path';

import { Code, Codes } from '../../typings';
import { SucroseError } from '../errors';

const date = new Date();
const directory = path.join(process.cwd(), 'logs');
if (!existsSync(directory) || !lstatSync(directory).isDirectory()) mkdirSync(directory);

export default class Logger {
  static console = new Console({
    stdout: createWriteStream(path.join(directory, `${date.getTime()}-output.log`)),
    stderr: createWriteStream(path.join(directory, `${date.getTime()}-errors.log`)),
  });

  /**
   * get current date formatted
   *
   * @remarks
   * @public
   *
   * @param format - allow to format date (default true)
   */
  static date(format = true): string | Date {
    const now = new Date();

    if (!format) return now;
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `\x1b[1m\x1b[30m[${hours}:${minutes}:${seconds}]\x1b[0m`;
  }

  /**
   * handle errors array
   *
   * @remarks
   * @public
   *
   * @param errors - array or errors to log
   */
  static handle(...errors: Error[]): void {
    errors.forEach((err) => {
      if (err instanceof SucroseError) Logger.give(err.code, err);
      else Logger.give('ERROR', err);
    });
  }

  /**
   * give a code with content message to write
   *
   * @remarks
   * @public
   *
   * @param code - code of log level
   * @param content - content to log
   */
  static give(code: Code, content: Error | string): void {
    const pre = `${Logger.date()} ${Codes[code]} `;

    Logger.write('\n');
    if ((code === 'FATAL' || code === 'ERROR' || code === 'WARN') && content instanceof Error) {
      const error = content;
      error.message = pre + error.message;
      Logger.console.error(error);
      console.error(error);
    } else if ((code === 'INFO' || code === 'SUCCESS' || code === 'WARN') && typeof content === 'string') {
      const message = pre + content;
      Logger.console.error(message);
      console.error(message);
    }
  }

  /**
   * write a table in consoles
   *
   * @remarks
   * @public
   *
   * @param content - content to log
   */
  static table(content: object | unknown[]): void {
    Logger.console.table(content);
    console.table(content);
  }

  /**
   * write a message in consoles
   *
   * @remarks
   * @public
   *
   * @param message - message to write
   */
  static write(message: string): void {
    Logger.console.log(message);
    console.log(message);
  }
}

/*
  Reset = "\x1b[0m"
  Bright = "\x1b[1m"
  Dim = "\x1b[2m"
  Underscore = "\x1b[4m"
  Blink = "\x1b[5m"
  Reverse = "\x1b[7m"
  Hidden = "\x1b[8m"

  FgBlack = "\x1b[30m"
  FgRed = "\x1b[31m"
  FgGreen = "\x1b[32m"
  FgYellow = "\x1b[33m"
  FgBlue = "\x1b[34m"
  FgMagenta = "\x1b[35m"
  FgCyan = "\x1b[36m"
  FgWhite = "\x1b[37m"

  BgBlack = "\x1b[40m"
  BgRed = "\x1b[41m"
  BgGreen = "\x1b[42m"
  BgYellow = "\x1b[43m"
  BgBlue = "\x1b[44m"
  BgMagenta = "\x1b[45m"
  BgCyan = "\x1b[46m"
  BgWhite = "\x1b[47m"
*/
