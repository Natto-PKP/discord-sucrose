// eslint-disable-next-line max-classes-per-file
import { EventEmitter } from 'events';

export interface LoggerOptions {
  verbose?: boolean | null;
  console?: Console | null;
  colored?: boolean | null;
}

export type LoggerEvent = 'error' | 'raw';

export const enum Levels {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

const defaultOptions: LoggerOptions = {
  verbose: false,
  console,
  colored: true,
};

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

export default class Logger extends EventEmitter {
  private console = console;

  constructor(public label: string, public options = defaultOptions) {
    super();

    if (options.console) this.console = options.console;
  }

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

  public debug(content: Error | string) {
    this.log('DEBUG', content);
  }

  public info(content: Error | string) {
    this.log('INFO', content);
  }

  public success(content: Error | string) {
    this.log('SUCCESS', content);
  }

  public warn(content: Error | string) {
    this.log('WARN', content);
  }

  public error(content: Error | string) {
    this.log('ERROR', content);
  }

  public fatal(content: Error | string) {
    this.log('FATAL', content);
  }

  public log(level: keyof typeof Levels, content: Error | string) {
    const { verbose } = this.options;

    const datetime = Logger.getDatetime(true);
    const name = content instanceof Error ? content.name : null;
    const message = content instanceof Error ? content.message : content;

    const newMessageWithColor = `${colors.gray + datetime + styles.reset} ${levelStyles[level]} ${name ? `[${name}] ` : ''}${message}`;
    const newMessageWithoutColor = `${datetime} ${level} ${name ? `[${name}] ` : ''}${message}`;
    const newMessage = this.options.colored ? newMessageWithColor : newMessageWithoutColor;

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

  public table(content: any) {
    this.console.table(content);
  }

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
