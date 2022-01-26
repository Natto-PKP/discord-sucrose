import dotenv from 'dotenv';
import Discord from 'discord.js';

import { Sucrose, Collection } from '../src';
import { EventManager } from '../src/managers/EventManager';

/* Types */
import type Types from '../typings';

dotenv.config();

describe('# Sucrose', () => {
  let sucrose: Types.Sucrose;

  it('Sucrose build', async () => {
    sucrose = await Sucrose.build({ intents: [Discord.Intents.FLAGS.GUILDS] });
    await sucrose.events.build();
    await sucrose.commands.build();
    await sucrose.interactions.build();
  });

  it('Discord client', () => {
    expect(sucrose.token).toBe(process.env.TOKEN);
    expect(sucrose.isReady()).toBe(true);
    expect(sucrose.application).toBeInstanceOf(Discord.ClientApplication);
    expect(sucrose.user).toBeInstanceOf(Discord.ClientUser);
  });

  // # event manager
  it('Event manager', () => {
    expect(sucrose.events).toBeInstanceOf(EventManager);
    expect(sucrose.events.collection).toBeInstanceOf(Collection);
    expect(sucrose.events.collection.size).toBe(sucrose.eventNames.length);
    expect(sucrose.events.collection.size).toBeTruthy();
  });

  // # event
  it('Event', async () => {
    for await (const [key, event] of sucrose.events.collection.entries()) {
      expect(event.name).toBe(key);
      event.mute();
      await event.listen();
      await event.refresh();
    }
    const ready = sucrose.events.collection.get('ready');
    if (ready) ready.mute();
  });

  // # command manager
  it('Command manager', async () => {
    const guildId = '813453131698536458';
    const commands = sucrose.commands.guilds.get(guildId);
    if (commands) {
      expect(commands.size).toBeTruthy();
      for await (const command of commands.toJSON()) {
        expect(command.body.type).toBeTruthy();
        expect(command.path).toBeTruthy();
        sucrose.commands.refresh(command.body.name);
        sucrose.commands.remove(command.body.name);
      }
    }
  });

  // # interactions manager
  it('Interaction manager', async () => {
    expect(sucrose.interactions.buttons.size).toBeTruthy();
    expect(sucrose.interactions.selectMenus.size).toBeTruthy();
  });

  afterAll((done) => {
    sucrose.destroy();
    done();
  });
});
