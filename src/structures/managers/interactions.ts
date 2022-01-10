/* Dependencies */
import { readdirSync, existsSync } from 'fs';

/* Typing */
import {
  Button,
  Collection,
  CommandData,
  CommandDataParams,
  CommandOptionData,
  CommandOptionDataParams,
  InteractionManagerOptions,
  Permissions,
  SelectMenu,
} from '../typings';
import { ButtonInteraction, CommandInteraction, ContextMenuInteraction, SelectMenuInteraction } from 'discord.js';
import { Sucrose } from '../sucrose';

/* Service */
import { SucroseError, Logger } from '../services/logger';
import { StringProgressBar, ConsoleLoading } from '../services/util';
import { interactions as contents } from '../contents';

/* Manager */
import { CommandManager } from './commands';

const [dir, ext] = process.env.PROD == 'true' ? ['dist', 'js'] : ['src', 'ts'];

/**
 * function for permissions check in a interaction
 */
const checkPermissions = async (
  interaction: CommandInteraction | ButtonInteraction | ContextMenuInteraction | SelectMenuInteraction,
  permissions: Permissions
): Promise<boolean> => {
  if (!interaction.guild) return false;

  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  /**
   * Client permissions
   */
  if (permissions.client && interaction.guild.me) {
    const missingPermissions = interaction.guild.me.permissions.missing(permissions.client); // Missing permissions of client

    if (missingPermissions.length) {
      // reply error message to user
      interaction.reply(contents.MISSING_CLIENT_PERMISSIONS(interaction.client, missingPermissions));
      return false;
    }
  } // [end] Client permissions

  /**
   * Member permissions
   */
  if (permissions.user) {
    const member = await interaction.guild.members.fetch(interaction.user.id); // Fetch member to Discord API
    const missingPermissions = member.permissions.missing(permissions.user); // Missing permissions of member

    if (member && missingPermissions.length) {
      // reply error message to user
      interaction.reply(contents.MISSING_MEMBER_PERMISSIONS(member, missingPermissions));
      return false;
    }
  } // [end] Member permissions
  return true;
}; // [end] unction for permissions check in a interaction

/**
 * Interactions manager and handler
 */
export class InteractionManager {
  public commands: CommandManager;
  public buttons: Collection<Button<'base' | 'link'>> = new Map();
  public selectMenus: Collection<SelectMenu> = new Map();

  public sucrose: Sucrose;

  public constructor(sucrose: Sucrose, options: InteractionManagerOptions) {
    this.sucrose = sucrose;

    this.commands = new CommandManager(sucrose); // New commands manager

    /**
     * Listen interactionCreate event and handle interactions/commands
     */
    sucrose.on('interactionCreate', async (interaction) => {
      try {
        if (interaction.isCommand() || interaction.isContextMenu()) {
          /**
           * Command handler
           */

          const args: CommandDataParams = { ...options.customParams, sucrose, interaction }; // Command arguments
          const name = interaction.commandName; // Get command name

          if (interaction.guild) {
            /**
             * Guild & global command handler
             */

            const guildCommands = this.commands.guilds.get(interaction.guild.id); // Get guild commands if exist
            const command: CommandData | undefined =
              guildCommands instanceof Map
                ? guildCommands.get(name) || this.commands.global.get(name)
                : this.commands.global.get(name); // Get command if exist
            if (!command) return; // return if command don't exist
            if (command.permissions && !(await checkPermissions(interaction, command.permissions))) return; // Check permissions of this interaction

            /**
             * If is chat input command
             */
            if (interaction.isCommand()) {
              const subCommandGroupName = interaction.options.getSubcommandGroup(false); // Get sub command group name
              const subCommandName = interaction.options.getSubcommand(false); // Get sub command name

              if (subCommandGroupName) {
                /**
                 * If interaction includes group command
                 */

                if (command.options) {
                  /**
                   * If command contains options
                   */

                  const subCommandGroup: CommandOptionData<'base'> | undefined =
                    command.options.get(subCommandGroupName); // Get sub command group

                  if (!subCommandGroup) {
                    return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUP(subCommandGroupName));
                  }

                  if (
                    subCommandGroup.permissions &&
                    !(await checkPermissions(interaction, subCommandGroup.permissions))
                  )
                    return; // Check permissions of sub command group

                  if (subCommandName) {
                    /**
                     * If command group includes sub command
                     */

                    if (subCommandGroup.options) {
                      /**
                       * If command group contains sub command
                       */
                      const subCommand: CommandOptionData<'sub'> | undefined =
                        subCommandGroup.options.get(subCommandName); // Get sub command
                      if (!subCommand) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(subCommandName));

                      if (subCommand.permissions && !(await checkPermissions(interaction, subCommand.permissions)))
                        return; // Check permissions of sub command

                      if (subCommand.exec) subCommand.exec(args as CommandOptionDataParams); // Exec guild sub command

                      // [end] If command group contains sub command
                    } else return interaction.reply(contents.commands.MISSING_SUB_COMMANDS(subCommandGroupName)); // If group not contains sub command
                  } // [end] If command group includes sub command

                  // [end] If command contains options
                } else return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUPS(name)); // if command not contain option

                // [end] If interaction includes group command
              } else if (subCommandName) {
                /**
                 * If interaction includes sub command
                 */
                if (command.options) {
                  /**
                   * If command contains sub commands
                   */

                  const subCommand: CommandOptionData<'base'> | undefined = command.options.get(subCommandName);
                  if (!subCommand) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(subCommandName));

                  if (subCommand.permissions && !(await checkPermissions(interaction, subCommand.permissions))) return; // Check permissions of sub command

                  if (subCommand.exec) await subCommand.exec(args as CommandOptionDataParams); // Exec guild sub command

                  // [end] If command contains sub commands
                } else return interaction.reply(contents.commands.MISSING_SUB_COMMANDS(name)); // If command not contain sub command
                // [end] If interaction includes sub command
              } else if (command.exec) await command.exec(args); // Exec guild command

              // [end] If is chat input command
            } else if (command.exec) await command.exec(args); // Exec User or Message command
          } else {
            /**
             * Global command handler
             */

            const command = this.commands.global.get(name); // Get global command
            if (command && command.exec) await command.exec(args); // exec global command
          } // [end] Global command handler

          // [end] Command handler
        } else if (interaction.isButton()) {
          /**
           * Buttons handler
           */

          const button = this.buttons.get(interaction.customId); // Get button
          if (!button) return;

          if (button.permissions && !(await checkPermissions(interaction, button.permissions))) return; // Check button permissions

          if (button.exec) await button.exec({ ...options.customParams, sucrose, interaction }); // Exec button

          // [end] Buttons handler
        } else if (interaction.isSelectMenu()) {
          /**
           * SelectMenus handler
           */

          const selectMenu = this.selectMenus.get(interaction.customId); // Get SelectMenu
          if (!selectMenu) return;

          if (selectMenu.permissions && !(await checkPermissions(interaction, selectMenu.permissions))) return; // Check selectMenu permissions

          if (selectMenu.exec) await selectMenu.exec({ ...options.customParams, sucrose, interaction }); // Exec selectMenu

          // [end] SelectMenus handler
        }
      } catch (error) {
        if (error instanceof Error) Logger.error(error, 'INTERACTION_EVENT');
      }
    }); // [end] Listen interactionCreate event and handle interactions/commands
  }

  /**
   * Build interactions manager
   */
  public async build(): Promise<void> {
    /**
     * Build commands
     */
    await this.commands.build().catch((errors) => Logger.handler(errors, 'COMMAND_MANAGER'));

    /**
     * Build buttons
     */
    if (existsSync(`./${dir}/interactions/buttons`)) {
      // Multiples errors handler
      const cache: { errors: Error[]; i: number } = { errors: [], i: 0 };
      const files = readdirSync(`./${dir}/interactions/buttons`);

      /**
       * If possible button file detected
       */
      if (files.length) {
        const content = () => `${StringProgressBar(cache.i + 1, files.length)}/${files.length} buttons processed`;
        const loading = new ConsoleLoading(content()); // Start loading console line

        /**
         * Loop all buttons files
         */
        for await (const file of files) {
          cache.i++; // Increment button index in logger cache

          try {
            const button = await import(`../../interactions/buttons/${file}`); // Import button
            this.load({ button }, file);
          } catch (error) {
            if (error instanceof Error) cache.errors.push(error);
          }

          loading.content = content(); // set new state in loading console line
        } // [end] Loop all buttons files

        loading.clear(); // clear loading console line

        if (cache.errors.length) throw cache.errors; // throw all errors of interaction section
        Logger.log(`${files.length} buttons loaded`, 'INTERACTION_MANAGER');
      } // [end] If possible button file detected
    } // [end] Build buttons

    /**
     * Build select menus
     */
    if (existsSync(`./${dir}/interactions/select_menus`)) {
      const cache: { errors: Error[]; i: number } = { errors: [], i: 0 };
      const files = readdirSync(`./${dir}/interactions/select_menus`);

      /**
       * Loop all select_menus files
       */
      if (files.length) {
        const content = () => `${StringProgressBar(cache.i + 1, files.length)}/${files.length} selectMenus processed`;
        const loading = new ConsoleLoading(content()); // Start loading console line

        /**
         * Loop all select_menus
         */
        for await (const file of files) {
          cache.i++;

          try {
            const selectMenu = await import(`../../interactions/select_menus/${file}`);
            this.load({ selectMenu }, file);
          } catch (error) {
            if (error instanceof Error) cache.errors.push(error);
          }

          loading.content = content(); // set new state in loading console line
        } // [end] Loop all selectMenus

        loading.clear(); // clear loading console line

        if (cache.errors.length) throw cache.errors; // throw all errors of interaction section
        Logger.log(`${files.length} select_menus loaded`, 'INTERACTION_MANAGER');
      } // [end] Loop all selectMenus files
    } // [end] Build select menus
  } // [end] Build interactions manager

  /**
   * Load interaction
   * @param interactions
   * @param file
   */
  private load(interactions: { button?: Button<'base' | 'link'>; selectMenu?: SelectMenu }, file: string): void {
    if (interactions.button) {
      /**
       * If this interaction is a button
       */

      const button = interactions.button; // Get button

      if (!button.data) throw new SucroseError('ERROR', 'INTERACTION_MISSING_DATA');
      button.data.type = 'BUTTON'; // Define interaction type to button data

      if ('customId' in button.data) {
        /**
         * If is classic button
         */

        if (!button.data.customId) throw new SucroseError('ERROR', 'INTERACTION_MISSING_ID');
        this.buttons.set(button.data.customId, button);
      } else if ('url' in button.data) {
        /**
         * If is url button
         */

        if (!button.data.url) throw new SucroseError('ERROR', 'INTERACTION_MISSING_URL');
        button.data.style = 'LINK'; // Define style to url button
        this.buttons.set(button.data.url, button);
      }

      // [end] If this interaction is a button
    } else if (interactions.selectMenu) {
      /**
       * If this interaction is a selectMenu
       */

      const selectMenu = interactions.selectMenu; // Get selectMenu

      if (!selectMenu.data) throw new SucroseError('ERROR', 'INTERACTION_MISSING_DATA');
      if (!selectMenu.data.customId) throw new SucroseError('ERROR', 'INTERACTION_MISSING_ID');
      selectMenu.data.type = 'SELECT_MENU'; // Defined intertaction type to selectMenu data

      this.selectMenus.set(selectMenu.data.customId, selectMenu);
    }
  } // [end] Load interaction
}
