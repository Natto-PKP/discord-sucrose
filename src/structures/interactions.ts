import { readdirSync, existsSync } from 'fs';
import { Interaction, PermissionResolvable } from 'discord.js';
import { Button, Collection, SelectMenu } from 'src/typings';

import { Sucrose } from './sucrose';
import { CommandManager } from './commands';
import { SucroseError } from './errors';

import { prod } from '../secret.json';
const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

const checkPermissions = async (interaction: Interaction, permissions: { client?: PermissionResolvable; user?: PermissionResolvable }): Promise<boolean> => {
  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  // Client permissions
  if (permissions.client && interaction.guild?.me?.permissions.missing(permissions.client).length) {
    // send message
    return false;
  } else if (permissions.user) {
    // Member permissions
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member || member.permissions.missing(permissions.user).length) {
      // send message
      return false;
    }
  }

  return true;
};

export class InteractionManager {
  public commands: CommandManager;
  public buttons: Collection<Button<'base' | 'link'>> = new Map();
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
          const guild_commands = this.commands.collection.get(interaction.guildId); // Get guild commands if exist
          const command = guild_commands instanceof Map ? guild_commands.get(name) || this.commands.collection.get(name) : this.commands.collection.get(name); // Get command if exist
          if (!command || command instanceof Map) return; // return if command don't exist or if command is Map

          // Permissions
          if (command.permissions && !(await checkPermissions(interaction, command.permissions))) return;

          command.exec({ sucrose, interaction });
        } else {
          const command = this.commands.collection.get(name);
          if (!command || command instanceof Map) return; // return if command don't exist or if command is Map

          command.exec({ sucrose, interaction });
        }
      } else if (interaction.isButton()) {
        const button = this.buttons.get(interaction.customId);
        if (!button || button instanceof Map) return;

        // Permissions
        if (button.permissions && !(await checkPermissions(interaction, button.permissions))) return;

        button.exec({ sucrose, interaction });
      } else if (interaction.isSelectMenu()) {
        const select_menu = this.select_menus.get(interaction.customId);
        if (!select_menu || select_menu instanceof Map) return;

        // Permissions
        if (select_menu.permissions && !(await checkPermissions(interaction, select_menu.permissions))) return;

        select_menu.exec({ sucrose, interaction });
      }
    });
  }

  /**
   * Build interactions manager
   */
  public async build(): Promise<void> {
    // Build buttons
    if (existsSync(`./${dir}/buttons`)) {
      // Multiples errors handler
      const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
      const files = readdirSync(`./${dir}/buttons`);

      for await (const file of files) {
        try {
          this.load({ button: await import(`../buttons/${file}`) }, file);
        } catch (error) {
          if (error instanceof Error) {
            errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/${file}` });
            if (files.length === errors.index) throw console.table(errors.array);
          }
        }
      }
    }

    // Build select menus
    if (existsSync(`./${dir}/select_menus`)) {
      // Multiples errors handler
      const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
      const files = readdirSync(`./${dir}/select_menus`);

      for await (const file of files) {
        try {
          this.load({ select_menu: await import(`../select_menus/${file}`) }, file);
        } catch (error) {
          if (error instanceof Error) {
            errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/${file}` });
            if (files.length === errors.index) throw console.table(errors.array);
          }
        }
      }
    }

    // Build commands manager
    await this.commands.build();
  }

  private load(interactions: { button?: Button<'base' | 'link'>; select_menu?: SelectMenu }, file: string): void {
    if (interactions.button) {
      // BUTTON
      const button = interactions.button;

      if (!button.data) throw new SucroseError('INTERACTION_MISSING_DATA', { section: 'INTERACTION_MANAGER' });
      button.data.type = 'BUTTON';

      if ('customId' in button.data) {
        if (!button.data.customId) throw new SucroseError('INTERACTION_MISSING_ID', { section: 'INTERACTION_MANAGER' });
        this.buttons.set(button.data.customId, button);
      } else if ('url' in button.data) {
        if (!button.data.url) throw new SucroseError('INTERACTION_MISSING_URL', { section: 'INTERACTION_MANAGER' });
        button.data.style = 'LINK';
        this.buttons.set(button.data.url, button);
      }
    } else if (interactions.select_menu) {
      // SELECT_MENU
      const select_menu = interactions.select_menu;

      if (!select_menu.data) throw new SucroseError('INTERACTION_MISSING_DATA', { section: 'INTERACTION_MANAGER' });
      if (!select_menu.data.customId) throw new SucroseError('INTERACTION_MISSING_ID', { section: 'INTERACTION_MANAGER' });
      select_menu.data.type = 'SELECT_MENU';

      this.select_menus.set(select_menu.data.customId, select_menu);
    }
  }
}
