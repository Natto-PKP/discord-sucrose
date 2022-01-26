export class ConsoleLoading {
  private bar = ['\\', '|', '/', '-'];
  private interval: null | NodeJS.Timer;
  private x = 0;

  constructor(public content: string) {
    this.content = content;

    this.interval = setInterval(() => {
      process.stdout.write('\r' + this.bar[this.x++] + ' ' + this.content);
      this.x &= 3;
    }, 175);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
  }
}
