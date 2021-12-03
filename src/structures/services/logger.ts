/* Dependencies */
import { createWriteStream, existsSync, lstatSync, mkdirSync } from 'fs';
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

  constructor(type: ErrorType, code: ErrorCode) {
    super(ErrorCodes[code]);

    this._type = type;
    this._code = code;
  }

  /**
   * Get error code
   */
  public get code(): ErrorCode {
    return this._code;
  } // [end] Get error code

  /**
   * Get type code
   */
  public get type(): ErrorType {
    return this._type;
  } // [end] Get type code
} // [end] Custom error

/**
 * Create logger console
 */
if (!existsSync('./_logs') || !lstatSync('./_logs').isDirectory()) mkdirSync('./_logs');
const console_logger = new Console({ stdout: createWriteStream('_logs/output.log'), stderr: createWriteStream('_logs/errors.log') });

/**
 * Logger
 */
export class Logger {
  static console = console_logger;

  /**
   * Get current date to Logger format
   */
  static get date(): string {
    const date = new Date();
    return `\x1b[47m\x1b[30m[${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}]\x1b[0m`;
  }

  /**
   * Manager multiple error
   * @param errors
   */
  static handler(errors: Error[], section?: ErrorSection): void {
    if (!errors.length) return;

    // Split others commands to SucroseErrors
    let [sucrose_errors, other_errors]: [SucroseError[], Error[]] = [[], []];
    for (const error of errors) error instanceof SucroseError ? sucrose_errors.push(error) : other_errors.push(error);

    // Sort SucroseErrors with code level
    const sucrose_errors_sorted = sucrose_errors.sort((a, b) => ErrorTypes[b.type] - ErrorTypes[a.type]);

    /**
     * If errors contains SucroseErrors
     */
    if (sucrose_errors_sorted.length) {
      /**
       * Loop all SucroseErrors
       */
      for (const error of sucrose_errors_sorted) {
        switch (error.type) {
          case 'WARN': // if type is Warn
            Logger.warn(error, section);
            break;

          case 'ERROR': // if type is Error
            Logger.error(error, section);
            break;
        }
      } // [end] Loop all SucroseErrors
    } // [end] If errors contains SucroseErrors

    for (const error of other_errors) Logger.error(error);
  } // [end] Manager multiple error

  /**
   * Write in nodejs and logger console
   * @param content
   */
  static write(content: string): void {
    console.log(content);
    Logger.console.log(content);
  } // [end] Write in nodejs and logger console

  /**
   * Log a ... void
   */
  static blank(): void {
    console.log();
    this.console.log();
  } // [end] Log a ... void

  /**
   * Log a separator
   */
  static separator(): void {
    Logger.write('-----');
  } // [end] Log a separator

  /**
   * Log a success log
   * @param content
   */
  static success(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[32m✔ SUCCESS\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${content}`;
    Logger.write(message);
  } // [end] Log a success log

  /**
   * Log a log
   * @param content
   */
  static log(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[34m🔎 LOG\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${content}`;
    Logger.write(message);
  } // [end] Log a log

  /**
   * Log a warn
   * @param error
   */
  static warn(error: Error | string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[33m⚡ WARN\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${error instanceof Error ? error.message : error}`;

    Logger.write(message);
    if (error instanceof Error && error.stack) Logger.console.error(error.stack);
  } // [end] Log a warn

  /**
   * Log a error
   * @param error
   */
  static error(error: Error, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[31m💢 ERROR\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${error.message}`;

    Logger.write(message);
    if (error.stack) Logger.console.error(error.stack);
  } // [end] Log a error
} // [end] Logger
