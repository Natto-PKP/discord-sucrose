/**
 * Create loading animation with message in your console
 */
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
    }, 250);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
  }
}

/**
 * Create progress bar with string
 * @param value
 * @param total
 * @param size
 * @param full
 * @param empty
 * @returns
 */
export const StringProgressBar = (value: number, total: number, size = 10, full = '#', empty = '-') => {
  const pourcent = Math.ceil((value / total) * size);
  return ''.padStart(pourcent, full).padEnd(size, empty);
};
