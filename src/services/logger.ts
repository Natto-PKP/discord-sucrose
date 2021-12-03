/* Dependencies */
import { createWriteStream } from 'fs';
import { Console } from 'console';

/* Enums */
import { ErrorCodes, ErrorTypes, ErrorSections } from '../typings/enum';

type ErrorCode = keyof typeof ErrorCodes;
type ErrorType = keyof typeof ErrorTypes;
type ErrorSection = keyof typeof ErrorSections;

/**
 * Custom error
 */
export class SucroseError extends Error {
  private _code: ErrorCode;
  private _type: ErrorType;
  private _section: ErrorSection;

  constructor(type: ErrorType, code: ErrorCode, section: ErrorSection) {
    super(ErrorCodes[code]);

    this._type = type;
    this._code = code;
    this._section = section;
  }

  public get code(): ErrorCode {
    return this._code;
  }

  public get type(): ErrorType {
    return this._type;
  }

  public get section(): ErrorSection {
    return this._section;
  }
}

/**
 * Create logger console
 */
const console_logger_date = Date.now();
const console_logger = new Console({ stdout: createWriteStream(`_logs/output-${console_logger_date}.log`), stderr: createWriteStream(`_logs/error-${console_logger_date}.log`) });

/**
 * Logger
 */

export class Logger {
  static console = console_logger;

  static get date(): string {
    const date = new Date();
    return `\x1b[47m\x1b[30m[${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}]\x1b[0m`;
  }

  static table(errors: SucroseError[]): void {}

  /**
   * Manager multiple error
   * @param errors
   */
  static handler(errors: Error[]): void {
    if (!errors.length) return;

    let [sucrose_errors, other_errors]: [SucroseError[], Error[]] = [[], []];
    for (const error of errors) error instanceof SucroseError ? sucrose_errors.push(error) : other_errors.push(error);
    const sucrose_errors_sorted = sucrose_errors.sort((a, b) => ErrorTypes[b.type] - ErrorTypes[a.type]);

    if (sucrose_errors_sorted.length) {
      for (const error of sucrose_errors_sorted) {
        switch (error.type) {
          case 'WARN':
            Logger.warn(error);
            break;

          case 'ERROR':
            Logger.error(error);
            break;
        }
      }
    }

    for (const error of other_errors) Logger.error(error);
  }

  /**
   * Log a ... void
   */
  static blank(): void {
    console.log();
    this.console.log();
  }

  /**
   * Log a separator
   */
  static separator(): void {
    const seperator = '-----';
    console.log(seperator);
    Logger.console.log(seperator);
  }

  /**
   * Log a info
   * @param string
   */
  static info(content: string): void {
    console.log(content);
    Logger.console.log(content);
  }

  /**
   * Log a success log
   * @param content
   */
  static success(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[32m✔ SUCCESS\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${content}`;

    console.log(message);
    Logger.console.log(message);
  }

  /**
   * Log a log
   * @param content
   */
  static log(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[34m🔎 LOG\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${content}`;

    console.log(message);
    Logger.console.log(message);
  }

  /**
   * Log a warn
   * @param error
   */
  static warn(error: Error | string): void {
    const section = error instanceof SucroseError ? error.section : null;
    const message = `${Logger.date} \x1b[33m⚡ WARN\x1b[0m ${section ? ErrorSections[section] : ''} :: ${error instanceof Error ? error.message : error}`;

    console.warn(message);
    Logger.console.warn(message);
    if (error instanceof Error && error.stack) Logger.console.error(error.stack);
  }

  /**
   * Log a error
   * @param error
   */
  static error(error: Error): void {
    const section = error instanceof SucroseError ? error.section : null;
    const message = `${Logger.date} \x1b[31m💢 ERROR\x1b[0m ${section ? ErrorSections[section] : ''} :: ${error.message}`;

    console.error(message);
    Logger.console.error(message);
    if (error.stack) Logger.console.error(error.stack);
  }
}
