/* eslint-disable jest/no-commented-out-tests */
import dotenv from 'dotenv';
import Discord from 'discord.js';
import path from 'path';

import { Sucrose } from '../src';
// import EventManager from '../src/managers/EventManager';

/* Types */
import type Types from '../typings';

// eslint-disable-next-line jest/require-hook
dotenv.config();

const guildId = '813453131698536458';
const options = <Types.SucroseOptions>{
  intents: [Discord.Intents.FLAGS.GUILDS],
  env: { source: 'tests', extension: 'ts' },
};

guildId;
options;
path;

// describe('# discord client', () => {
//   let sucrose: Types.Sucrose;

//   beforeAll(async () => (sucrose = await Sucrose.build(options)));
//   afterAll(() => sucrose.destroy());

//   it('is ready', async () => {
//     expect.hasAssertions();

//     expect(sucrose.token).toBe(process.env.TOKEN);
//     expect(sucrose.isReady()).toBe(true);
//     expect(sucrose.application).toBeInstanceOf(Discord.ClientApplication);
//     expect(sucrose.user).toBeInstanceOf(Discord.ClientUser);
//   });

//   it('rebuild already', async () => {
//     expect.hasAssertions();

//     await expect(sucrose.commands.guilds.get(guildId)?.build()).rejects.toThrow(/is already build$/);
//     await expect(sucrose.commands.build()).rejects.toThrow(/is already build$/);
//     await expect(sucrose.events.build()).rejects.toThrow(/is already build$/);
//   });
// });

describe('# event manager', () => {
  let sucrose: Types.Sucrose;

  beforeAll(async () => (sucrose = await Sucrose.build(options)));
  afterAll(() => sucrose.destroy());

  it('events loaded', () => {
    expect.hasAssertions();

    expect(sucrose.events.collection.size).toBeTruthy();
  });

  it('event manage', async () => {
    expect.hasAssertions();

    const event = <Types.Event>sucrose.events.collection.random();

    expect(typeof event.name).toBe('string');
    expect(event.manager).toBe(sucrose.events);
    await expect(event.mute()).resolves.toBeTruthy();
    await expect(event.mute()).rejects.toThrow(/does not have a listener$/);
    await expect(event.listen()).resolves.toBeTruthy();
    await expect(event.refresh()).resolves.toBeTruthy();
    await expect(event.remove()).resolves.toBeFalsy();
    await expect(event.listen()).rejects.toThrow(/is disabled$/);
  });
});

// describe('# command manager', () => {
//   let sucrose: Types.Sucrose;

//   beforeAll(async () => (sucrose = await Sucrose.build(options)));
//   afterAll(() => sucrose.destroy());

//   it('command manage', async () => {
//     expect.hasAssertions();

//     const commands = <Types.GuildCommandManager>sucrose.commands.guilds.random();
//     const command = <Types.CommandData>commands.collection.random();
//     const name = command.body.name;
//     const file = path.basename(command.path);

//     expect(typeof command.body).toBe('object');
//     expect(typeof command.path).toBe('string');
//     await expect(commands.add(file)).rejects.toThrow(/already exists in collection$/);
//     await expect(commands.refresh(name)).resolves.toBeTruthy();
//     expect(commands.remove(name)).toBeFalsy();
//     await expect(commands.add(file)).resolves.toBeTruthy();
//   });
// });

// describe('# interaction manager', () => {
//   let sucrose: Types.Sucrose;

//   beforeAll(async () => (sucrose = await Sucrose.build(options)));
//   afterAll(() => sucrose.destroy());

//   it('button manage', async () => {
//     expect.hasAssertions();

//     const buttons = sucrose.interactions.buttons;
//     const button = <Types.ButtonData>buttons.collection.random();
//     const name = 'customId' in button.data ? button.data.customId : button.data.url; // eslint-disable-line jest/no-conditional-in-test
//     const file = path.basename(button.path);

//     expect(typeof button.data).toBe('object');
//     expect(typeof button.path).toBe('string');
//     await expect(buttons.add(file)).rejects.toThrow(/already exists in collection$/);
//     await expect(buttons.refresh(name)).resolves.toBeTruthy();
//     expect(buttons.remove(name)).toBeFalsy();
//     await expect(buttons.add(file)).resolves.toBeTruthy();
//   });

//   it('select menu manage', async () => {
//     expect.hasAssertions();

//     const selectMenus = sucrose.interactions.selectMenus;
//     const selectMenu = <Types.SelectMenuData>selectMenus.collection.random();
//     const name = <string>selectMenu.data.customId;
//     const file = path.basename(selectMenu.path);

//     expect(typeof selectMenu.data).toBe('object');
//     expect(typeof selectMenu.path).toBe('string');
//     await expect(selectMenus.add(file)).rejects.toThrow(/already exists in collection$/);
//     await expect(selectMenus.refresh(name)).resolves.toBeTruthy();
//     expect(selectMenus.remove(name)).toBeFalsy();
//     await expect(selectMenus.add(file)).resolves.toBeTruthy();
//   });
// });
