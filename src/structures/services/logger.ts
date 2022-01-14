/* Dependencies */
import { createWriteStream, existsSync, lstatSync, mkdirSync } from 'fs-extra';
import { Console } from 'console';

/* Enums */
import { ErrorCodes, ErrorTypes, ErrorSections } from '../typings/enum';

type ErrorCode = keyof typeof ErrorCodes;
type ErrorType = keyof typeof ErrorTypes;
type ErrorSection = keyof typeof ErrorSections;

//? Custom error
export class SucroseError extends Error {
  private _code: ErrorCode;
  private _type: ErrorType;

  constructor(type: ErrorType, code: ErrorCode) {
    super(ErrorCodes[code]);

    this._type = type;
    this._code = code;
  }

  public get code(): ErrorCode {
    return this._code;
  }

  public get type(): ErrorType {
    return this._type;
  }
} //? [end] Custom error

//? Create loading animation with message in your console
export class ConsoleLoading {
  public content = '';

  private bar = ['\\', '|', '/', '-'];
  private interval: null | NodeJS.Timer;
  private x = 0;

  constructor(content: string) {
    this.content = content;

    this.interval = setInterval(() => {
      process.stdout.write('\r' + this.bar[this.x++] + ' ' + this.content);
      this.x &= 3;
    }, 175);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
  }
} //? [end] Create loading animation with message in your console

//? Create logger console
if (!existsSync('./_logs') || !lstatSync('./_logs').isDirectory()) mkdirSync('./_logs');
const console_logger = new Console({
  stdout: createWriteStream('_logs/output.log'),
  stderr: createWriteStream('_logs/errors.log'),
});

//? Logger
export class Logger {
  static console = console_logger;

  //? Get current date to Logger format
  static get date(): string {
    const date = new Date();
    return `\x1b[47m\x1b[30m[${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}]\x1b[0m`;
  } //? [end] Get current date to Logger format

  //? Manager multiple error
  static handler(errors: Error[], section?: ErrorSection): void {
    if (!errors.length) return;

    // Split others commands to SucroseErrors
    const [sucrose_errors, other_errors]: [SucroseError[], Error[]] = [[], []];
    for (const error of errors) error instanceof SucroseError ? sucrose_errors.push(error) : other_errors.push(error);

    // Sort SucroseErrors with code level
    const sucrose_errors_sorted = sucrose_errors.sort((a, b) => ErrorTypes[b.type] - ErrorTypes[a.type]);

    //? If errors contains SucroseErrors
    if (sucrose_errors_sorted.length) {
      //? Loop all SucroseErrors
      for (const error of sucrose_errors_sorted) {
        switch (error.type) {
          case 'WARN': // if type is Warn
            Logger.warn(error, section);
            break;

          case 'ERROR': // if type is Error
            Logger.error(error, section);
            break;
        }
      } //? [end] Loop all SucroseErrors
    } //? [end] If errors contains SucroseErrors

    for (const error of other_errors) Logger.error(error);
  } //? [end] Manager multiple error

  //? Write in nodejs and logger console
  static write(content: string): void {
    console.log(content);
    Logger.console.log(content);
  } //? [end] Write in nodejs and logger console

  //? Log a ... void
  static blank(): void {
    console.log();
    this.console.log();
  } //? [end] Log a ... void

  //? Log a separator
  static separator(): void {
    Logger.write('-----');
  } //? [end] Log a separator

  //? Log a success log
  static success(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[32m✔ SUCCESS\x1b[0m ${
      section ? ErrorSections[section] + ' :: ' : ''
    }${content}`;
    Logger.write(message);
  } //? [end] Log a success log

  //? Log a log
  static log(content: string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[34m🔎 LOG\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${content}`;
    Logger.write(message);
  } //? [end] Log a log

  //? Log a warn
  static warn(error: Error | string, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[33m⚡ WARN\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${
      error instanceof Error ? error.message : error
    }`;

    Logger.write(message);
    if (error instanceof Error && error.stack) Logger.console.error(error.stack);
  } //? [end] Log a warn

  //? Log a error
  static error(error: Error, section?: ErrorSection): void {
    const message = `${Logger.date} \x1b[31m💢 ERROR\x1b[0m ${section ? ErrorSections[section] + ' :: ' : ''}${
      error.message
    }`;

    Logger.write(message);
    if (error.stack) Logger.console.error(error.stack);
  } //? [end] Log a error
} //? [end] Logger
