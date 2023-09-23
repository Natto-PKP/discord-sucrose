// eslint-disable-next-line max-classes-per-file
import { EventEmitter } from 'events';

/**
 * Logger options
 * @public
 */
export interface LoggerOptions {
  verbose?: boolean | null;
  console?: Console | null;
  colored?: boolean | null;
}

/**
 * Logger event
 * @public
 */
export type LoggerEvent = 'error' | 'raw';

/**
 * Logger levels
 * @public
 */
export const enum Levels {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

/**
 * Logger
 * @public
 */
const defaultOptions: LoggerOptions = {
  verbose: false,
  console,
  colored: true,
};

/**
 * Logger styles
 * @public
 */
const styles = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
};

const colors = {
  black: { font: '\x1b[30m', background: '\x1b[40m' },
  red: { font: '\x1b[31m', background: '\x1b[41m' },
  green: { font: '\x1b[32m', background: '\x1b[42m' },
  yellow: { font: '\x1b[33m', background: '\x1b[43m' },
  blue: { font: '\x1b[34m', background: '\x1b[44m' },
  magenta: { font: '\x1b[35m', background: '\x1b[45m' },
  cyan: { font: '\x1b[36m', background: '\x1b[46m' },
  white: { font: '\x1b[37m', background: '\x1b[47m' },
  gray: { font: '\x1b[38m', background: '\x1b[48m' },
};

const levelStyles = {
  DEBUG: `🔎 ${colors.cyan + styles.bright}DEBUG${styles.reset}`,
  INFO: `📰 ${colors.blue + styles.bright}INFO${styles.reset}`,
  SUCCESS: `✅ ${colors.green + styles.bright}SUCCESS${styles.reset}`,
  WARN: `⚠️ ${colors.yellow + styles.bright}WARN${styles.reset}`,
  ERROR: `🚫 ${colors.red + styles.bright}ERROR${styles.reset}`,
  FATAL: `🛑 ${colors.magenta + styles.bright}FATAL${styles.reset}`,
};

/**
 * Logger
 * @public
 * @example
 * ```ts
 * import { Logger } from 'sucrose';
 *
 * const logger = new Logger('my-logger');
 * logger.debug('Hello world!');
 * logger.info('Hello world!');
 * logger.success('Hello world!');
 * logger.warn('Hello world!');
 * logger.error('Hello world!');
 * logger.fatal('Hello world!');
 * ```
 */
export class Logger extends EventEmitter {
  private console = console;

  constructor(public label: string, public options = defaultOptions) {
    super();

    if (options.console) this.console = options.console;
  }

  /**
   * add styles to a string for console output
   * @param str - String to add styles
   * @param content - Styles to add
   * @returns
   */
  public static addStyles(str: string, content: 'rainbow' | (`colors.${keyof typeof colors}` | `colors.${keyof typeof colors}.${'font' | 'background'}` | `styles.${keyof typeof styles}`)[]) {
    if (content === 'rainbow') {
      const characters = str.split('');
      const arr = Object.values(colors);
      return characters.reduce((acc, char) => {
        if (/\s/.test(char)) return acc + char;
        const color = arr[Math.floor(Math.random() * arr.length)].font;
        return acc + color + char + styles.reset;
      }, '');
    }

    return content.reduce((acc, cur) => {
      const [obj, prop, mod] = cur.split('.');
      const object = obj === 'colors' ? colors : styles;
      const value = object[prop as keyof typeof object];
      if (obj === 'colors') return acc + value[mod as keyof typeof value || 'font'];
      return acc + value;
    }, '') + str + styles.reset;
  }

  /**
   * Log debug
   * @param content - Content to log
   */
  public debug(content: Error | string) {
    this.log('DEBUG', content);
  }

  /**
   * Log info
   * @param content - Content to log
   */
  public info(content: Error | string) {
    this.log('INFO', content);
  }

  /**
   * Log success
   * @param content - Content to log
   */
  public success(content: Error | string) {
    this.log('SUCCESS', content);
  }

  /**
   * Log warn
   * @param content - Content to log
   */
  public warn(content: Error | string) {
    this.log('WARN', content);
  }

  /**
   * Log error
   * @param content - Content to log
   */
  public error(content: Error | string) {
    this.log('ERROR', content);
  }

  /**
   * Log fatal
   * @param content - Content to log
   */
  public fatal(content: Error | string) {
    this.log('FATAL', content);
  }

  /**
   * Log
   * @param level - Level to log
   * @param content - Content to log
   * @param options - Options
   */
  public log(level: keyof typeof Levels, content: Error | string, options?: {
    withDate?: boolean | null;
    verbose?: boolean | null;
    colored?: boolean | null;
    tabulation?: number | null;
  }) {
    const withDate = options?.withDate ?? true;
    const verbose = options?.verbose ?? this.options.verbose ?? false;
    const colored = options?.colored ?? this.options.colored ?? true;
    const tabulation = options?.tabulation ?? 0;

    const datetime = Logger.getDatetime(true);
    const name = content instanceof Error ? content.name : null;
    const message = content instanceof Error ? content.message : content;

    const newMessageWithColor = `${withDate ? `${colors.gray + datetime + styles.reset} ` : ''}${levelStyles[level]} ${name ? `[${name}] ` : ''}${message}`;
    const newMessageWithoutColor = `${withDate ? `${datetime} ` : ''}${level} ${name ? `[${name}] ` : ''}${message}`;
    let newMessage = colored ? newMessageWithColor : newMessageWithoutColor;
    if (tabulation) newMessage = `${'\t'.repeat(tabulation)}${newMessage}`;

    const newContent = content;
    if (newContent instanceof Error) newContent.message = newMessage;
    const toSend = !verbose && newContent instanceof Error ? newContent.message : newContent;

    if (level === 'DEBUG') this.console.debug(toSend);
    if (level === 'INFO') this.console.info(toSend);
    if (level === 'SUCCESS') this.console.log(toSend);
    if (level === 'WARN') this.console.warn(toSend);
    if (level === 'ERROR' || level === 'FATAL') this.console.error(toSend);

    this.emit('raw', content, Logger.getDatetime(false));
    if (level === 'FATAL' || level === 'ERROR') this.emit('error', content, Logger.getDatetime(false));
  }

  /**
   * Log table
   * @param content - Content to log
   */
  public table(content: any) {
    this.console.table(content);
  }

  /**
   * Get datetime
   * @param formated - Formated date
   * @returns - Date | string
   */
  static getDatetime<F extends boolean>(formated?: F | null): F extends true ? string : Date {
    const today = new Date();
    if (!formated) return today as F extends true ? string : Date;

    const days = today.getDate().toString().padStart(2, '0');
    const months = (today.getMonth() + 1).toString().padStart(2, '0');
    const years = today.getFullYear().toString().padStart(4, '0');
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
    const milliseconds = today.getMilliseconds().toString().padStart(3, '0');
    return `${days}/${months}/${years} ${hours}:${minutes}:${seconds}.${milliseconds}` as F extends true ? string : Date;
  }

  public override on(event: LoggerEvent, listener: (error: Error | string, date: Date) => void) {
    return super.on(event, listener);
  }

  public override once(event: LoggerEvent, listener: (error: Error | string, date: Date) => void) {
    return super.once(event, listener);
  }

  public override emit(event: LoggerEvent, error: Error | string, date: Date) {
    return super.emit(event, error, date);
  }
}