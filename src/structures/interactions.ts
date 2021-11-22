import { readdirSync, existsSync } from 'fs';
import { Button, Collection, Command, SelectMenu } from 'src/typings';
import { Sucrose } from './sucrose';
import { CommandManager } from './commands';

import { prod } from '../secret.json';
const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

export class InteractionManager {
  public commands: CommandManager;
  public buttons: Collection<Button> = new Map();
  public select_menus: Collection<SelectMenu> = new Map();

  public sucrose: Sucrose;

  public constructor(sucrose: Sucrose) {
    this.sucrose = sucrose;

    this.commands = new CommandManager(sucrose); // New commands manager

    // Listen interactionCreate event
    sucrose.on('interactionCreate', async (interaction) => {
      if (interaction.isCommand() || interaction.isContextMenu()) {
        const name = interaction.commandName; // Get command name
        if (interaction.guild) {
          console.log(name);

          const guild_commands = this.commands.collection.get(interaction.guildId); // Get guild commands if exist
          const command = guild_commands instanceof Map ? guild_commands.get(name) || this.commands.collection.get(name) : this.commands.collection.get(name); // Get command if exist

          console.log(guild_commands);

          if (!command || command instanceof Map) return; // return if command don't exist or if command is Map

          // Permissions
          if (command.permissions) {
            /**
             * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
             * Ajouter les messages d'erreurs customisable
             */
            if (command.permissions.client && !interaction.guild.me?.permissions.missing(command.permissions.client).length) return;
            if (command.permissions.user && !(await interaction.guild.members.fetch(interaction.user.id)).permissions.missing(command.permissions.user).length) return;
          }

          command.exec({ sucrose, interaction });
        } else {
          const command = this.commands.collection.get(name);
          if (!command || command instanceof Map) return; // return if command don't exist or if command is Map

          command.exec({ sucrose, interaction });
        }
      } else if (interaction.isButton()) {
        console.log('button');
      } else if (interaction.isSelectMenu()) {
        console.log('selectmenu');
      }
    });
  }

  /**
   * Build interactions manager
   */
  public async build(): Promise<void> {
    // Build buttons
    if (existsSync(`./${dir}/buttons`)) for await (const file of readdirSync(`./${dir}/buttons`)) this.load({ button: await import(`../buttons/${file}`) }, file);

    // Build select menus
    if (existsSync(`./${dir}/select_menus`)) for await (const file of readdirSync(`./${dir}/select_menus`)) this.load({ select_menu: await import(`../select_menus/${file}`) }, file);

    // Build commands manager
    await this.commands.build();
  }

  private load(interactions: { button?: Button; select_menu?: SelectMenu }, file: string): void {
    if (interactions.button) {
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
