import { Console } from 'console';
import { createWriteStream, existsSync, lstatSync, mkdirSync } from 'fs';
import { ConsoleLoading } from '../utils';

/* Types */
import '../../typings/errors';

if (!existsSync('./_logs') || !lstatSync('./_logs').isDirectory()) mkdirSync('./_logs');

export class Logger {
  /**
   * Sucrose console
   */
  static console = new Console({
    stdout: createWriteStream('_logs/output.log'),
    stderr: createWriteStream('_logs/errors.log'),
  });

  static loading = ConsoleLoading;

  /**
   * Get actual date for logs
   */
  static date(format = true): string | Date {
    const date = new Date();

    if (!format) return date;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `\x1b[47m\x1b[30m[${hours}:${minutes}:${seconds}]\x1b[0m`;
  }

  /**
   * Handle an errors array
   * @param errors
   * @param section
   */
  static handle(errors: Error[] | Error, section?: Section): void {
    for (const error of Array.isArray(errors) ? errors : [errors]) {
      Logger.log(error, 'ERROR', section);
    }
  }

  /**
   * Advanced log
   * @param error
   * @param code
   * @param section
   */
  static log(error: Error | string, code?: Code, section?: Section): void {
    const c = error instanceof SucroseError ? error.code : code;
    const message = [
      Logger.date(),
      c ? Codes[c] : null,
      section ? `${section} ⬡` : null,
      ...(error instanceof Error ? [error.name, error.message] : [error]),
    ].filter((a) => a);
    Logger.write(message.join(' '));
  }

  /**
   * Basic log
   * @param content
   */
  static write(content = ''): void {
    Logger.console.log(content);
    console.log(content);
  }
}
