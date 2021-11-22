import { Client, ClientOptions } from 'discord.js';
import { token } from '../secret.json';

import { Events } from './events';
import { Interactions } from './interactions';

export class Sucrose extends Client {
  public events: Events;
  public interactions: Interactions;

  public constructor(options: ClientOptions) {
    super(options);

    this.events = new Events(this);
    this.interactions = new Interactions(this);

    this.login(token);
  }
}
