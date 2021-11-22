import { Client, ClientOptions } from 'discord.js';
import { token } from '../secret.json';

import { Events } from './events';
import { InteractionManager } from './interactions';

export class Sucrose extends Client {
  public events: Events;
  public interactions: InteractionManager;

  public constructor(options: ClientOptions) {
    super(options);

    this.events = new Events(this);
    this.interactions = new InteractionManager(this);

    this.login(token);
  }

  public async build(): Promise<void> {
    // Fetch client application
    await new Promise((resolve, reject) => {
      this.once('ready', async () => {
        const application = await this.application?.fetch();
        application ? resolve(application) : reject();
      });
    });

    // Build sucrose manager
    await this.events.build();
    await this.interactions.build();
  }
}
