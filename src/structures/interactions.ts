import { readdirSync, existsSync } from 'fs';
import { Button, Collection, CommandOptionData, Permissions, SelectMenu } from 'src/typings';
import { ButtonInteraction, CommandInteraction, ContextMenuInteraction, SelectMenuInteraction } from 'discord.js';

import { Sucrose } from './sucrose';
import { CommandManager } from './commands';
import { SucroseError } from './errors';
import { interactions as contents } from './contents';

import { prod } from '../secret.json';
const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

const checkPermissions = async (interaction: CommandInteraction | ButtonInteraction | ContextMenuInteraction | SelectMenuInteraction, permissions: Permissions): Promise<true | void> => {
  if (!interaction.guild) return;
  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  if (permissions.client && interaction.guild.me) {
    // Client permissions
    const missing_permissions = interaction.guild.me.permissions.missing(permissions.client);

    if (missing_permissions.length) interaction.reply(contents.MISSING_CLIENT_PERMISSIONS(interaction.client, missing_permissions));
    else return true;
  } else if (permissions.user) {
    // Member permissions
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const missing_permissions = member.permissions.missing(permissions.user);

    if (member && missing_permissions.length) interaction.reply(contents.MISSING_MEMBER_PERMISSIONS(member, missing_permissions));
    else return true;
  } else return true;
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
        const args = { sucrose, interaction }; // Command arguments
        const name = interaction.commandName; // Get command name

        if (interaction.guild) {
          const guild_commands = this.commands.guilds.get(interaction.guildId); // Get guild commands if exist
          const command = guild_commands instanceof Map ? guild_commands.get(name) || this.commands.global.get(name) : this.commands.global.get(name); // Get command if exist
          if (!command) return; // return if command don't exist or if command is Map
          if (command.permissions && !(await checkPermissions(interaction, command.permissions))) return; // Check permissions of commands

          /**
           * If is chat input command
           */
          if (interaction.isCommand()) {
            const _sub_command_group = interaction.options.getSubcommandGroup(false);
            const _sub_command = interaction.options.getSubcommand(false);

            if (_sub_command_group) {
              /**
               * If interaction includes group command
               */
              if (command.options) {
                const sub_command_group: CommandOptionData<'base'> | undefined = command.options.get(_sub_command_group);
                if (!sub_command_group) return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUP(_sub_command_group));

                if (sub_command_group.permissions && !(await checkPermissions(interaction, sub_command_group.permissions))) return; // Check permissions of command group

                /**
                 * If interaction includes sub command
                 */
                if (_sub_command) {
                  if (sub_command_group.options) {
                    const sub_command: CommandOptionData<'sub'> | undefined = sub_command_group.options.get(_sub_command);
                    if (!sub_command) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(_sub_command));

                    if (sub_command.permissions && !(await checkPermissions(interaction, sub_command.permissions))) return; // Check permissions of sub command

                    sub_command.exec(args);
                  } else return interaction.reply(contents.commands.MISSING_SUB_COMMANDS(_sub_command_group));
                }
              } else return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUPS(name));
            } else if (_sub_command) {
              /**
               * If interaction includes sub command
               */
              if (command.options) {
                const sub_command: CommandOptionData<'base'> | undefined = command.options.get(_sub_command);
                if (!sub_command) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(_sub_command));

                if (sub_command.permissions && !(await checkPermissions(interaction, sub_command.permissions))) return; // Check permissions of sub command

                sub_command.exec(args);
              } else return interaction.reply(contents.commands.MISSING_SUB_COMMANDS(name));
            } else command.exec(args);
          } else command.exec(args);
        } else {
          const command = this.commands.global.get(name);
          if (!command) return; // return if command don't exist or if command is Map

          command.exec(args);
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
