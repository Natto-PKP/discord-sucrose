import { readdirSync, existsSync } from 'fs';
import { Button, Command, SelectMenu } from 'src/typings';
import { Sucrose } from './sucrose';
import { prod } from '../secret.json';

const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

export class Interactions {
  public commands: { global: Map<string, Command>; guilds: Map<string, Map<string, Command>> } = { global: new Map(), guilds: new Map() };
  public buttons: Map<string, Button> = new Map();
  public select_menus: Map<string, SelectMenu> = new Map();

  public sucrose: Sucrose;

  public constructor(sucrose: Sucrose) {
    this.sucrose = sucrose;

    // Load interactions
    if (existsSync(`./${dir}/commands`)) readdirSync(`./${dir}/commands`).forEach(async (file) => this.load({ command: await import(`../commands/${file}`) }, file));
    if (existsSync(`./${dir}/buttons`)) readdirSync(`./${dir}/buttons`).forEach(async (file) => this.load({ button: await import(`../buttons/${file}`) }, file));
    if (existsSync(`./${dir}/select_menus`)) readdirSync(`./${dir}/select_menus`).forEach(async (file) => this.load({ select_menu: await import(`../select_menus/${file}`) }, file));

    // Listen interactionCreate event
    sucrose.on('interactionCreate', (interaction) => {
      if (interaction.isCommand() || interaction.isContextMenu()) {
        console.log('command');
      } else if (interaction.isButton()) {
        console.log('button');
      } else if (interaction.isSelectMenu()) {
        console.log('selectmenu');
      }
    });
  }

  public load(interactions: { command?: Command; button?: Button; select_menu?: SelectMenu }, file: string): void {
    if (interactions.command) {
      // COMMAND

      const command = interactions.command;

      if (!command.body) throw Error(`[Sucrose] command in "${file}" :: missing body`);
      if (!command.body.name) throw Error(`[Sucrose] command in "${file}" :: missing body.name`);

      // Global command
      if (command.options?.global) {
        if (this.commands.global.has(command.body.name)) throw Error(`[Sucrose] command in "${file}" :: duplicate global command`);
        this.commands.global.set(command.body.name, command);
      }

      // Guild(s) command
      if (command.options?.guilds?.length) {
        command.options.guilds.forEach((guild) => {
          const guild_commands = this.commands.guilds.get(guild) || this.commands.guilds.set(guild, new Map()).get(guild);

          if (guild_commands instanceof Map) {
            if (guild_commands.has(command.body.name)) throw Error(`[Sucrose] command in "${file}" :: duplicate guild ("${guild}") command`);
            guild_commands.set(command.body.name, command);
          }
        });
      }
    } else if (interactions.button) {
      // BUTTON
      const button = interactions.button;

      if (!button.data) throw Error(`[Sucrose] command in "${file}" :: missing body`);
      if (!button.data.customId) throw Error(`[Sucrose] command in "${file}" :: missing data.customId`);

      this.buttons.set(button.data.customId, button);
    } else if (interactions.select_menu) {
      // SELECT_MENU
      const select_menu = interactions.select_menu;

      if (!select_menu.data) throw Error(`[Sucrose] command in "${file}" :: missing data`);
      if (!select_menu.data.customId) throw Error(`[Sucrose] command in "${file}" :: missing data.customId`);

      this.select_menus.set(select_menu.data.customId, select_menu);
    }
  }
}
