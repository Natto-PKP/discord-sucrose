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

const now = Date.now();

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

  static clear() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }

  /**
   * get current date formatted
   *
   * @param format - allow to format date (default true)
   */
  static date(format = true, useColor = true): string | Date {
    const today = new Date();

    if (!format) return today;
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
    if (useColor) return `\x1b[1m\x1b[30m[${hours}:${minutes}:${seconds}]\x1b[0m`;
    return `[${hours}:${minutes}:${seconds}]`;
  }

  /**
   * write a error in consoles
   *
   * @param message - message to log
   */
  public error(content: string | Error, original?: string | Error): void {
    Logger.clear();
    this.directory?.error(content);

    if (content instanceof Error && !this.options.verbose) {
      this.console.log(content.message);
    } else this.console.error(content);

    this.emit('error', original || content);
    this.emit('raw', original || content);
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
    const pre = `${Logger.date()} ${Codes[code]} `;

    if (code === 'FATAL' || code === 'ERROR' || code === 'WARN') {
      let error = content;
      if (error instanceof Error) error.message = pre + error.message;
      else error = pre + content;

      this.error(error, content);
    } else {
      const base = content instanceof Error ? content.message : content;
      const message = pre + base;
      this.write(message, base);
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
   *
   * @param content - content to log
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
   *
   * @param message - message to write
   */
  public write(message: string, original?: string): void {
    Logger.clear();
    this.directory?.log(message);
    this.console.log(message);
    this.emit('output', original || message);
    this.emit('raw', original || message);
  }
}
