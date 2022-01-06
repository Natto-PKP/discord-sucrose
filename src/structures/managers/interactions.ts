/* Dependencies */
import { readdirSync, existsSync } from 'fs';

/* Typing */
import { Button, Collection, CommandData, CommandDataParams, CommandOptionData, CommandOptionDataParams, Permissions, SelectMenu } from 'src/structures/typings';
import { ButtonInteraction, CommandInteraction, ContextMenuInteraction, SelectMenuInteraction } from 'discord.js';
import { Sucrose } from '../sucrose';
import { Params as CustomParams } from '../typings/custom';

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
const checkPermissions = async (interaction: CommandInteraction | ButtonInteraction | ContextMenuInteraction | SelectMenuInteraction, permissions: Permissions): Promise<boolean> => {
  if (!interaction.guild) return false;

  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  /**
   * Client permissions
   */
  if (permissions.client && interaction.guild.me) {
    const missing_permissions = interaction.guild.me.permissions.missing(permissions.client); // Missing permissions of client

    if (missing_permissions.length) {
      // reply error message to user
      interaction.reply(contents.MISSING_CLIENT_PERMISSIONS(interaction.client, missing_permissions));
      return false;
    }
  } // [end] Client permissions

  /**
   * Member permissions
   */
  if (permissions.user) {
    const member = await interaction.guild.members.fetch(interaction.user.id); // Fetch member to Discord API
    const missing_permissions = member.permissions.missing(permissions.user); // Missing permissions of member

    if (member && missing_permissions.length) {
      // reply error message to user
      interaction.reply(contents.MISSING_MEMBER_PERMISSIONS(member, missing_permissions));
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
  public select_menus: Collection<SelectMenu> = new Map();

  public sucrose: Sucrose;

  public constructor(sucrose: Sucrose, options: { custom_params: CustomParams }) {
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

          const args: CommandDataParams = { ...options.custom_params, sucrose, interaction }; // Command arguments
          const name = interaction.commandName; // Get command name

          if (interaction.guild) {
            /**
             * Guild & global command handler
             */

            const guild_commands = this.commands.guilds.get(interaction.guild.id); // Get guild commands if exist
            const command: CommandData | undefined = guild_commands instanceof Map ? guild_commands.get(name) || this.commands.global.get(name) : this.commands.global.get(name); // Get command if exist
            if (!command) return; // return if command don't exist
            if (command.permissions && !(await checkPermissions(interaction, command.permissions))) return; // Check permissions of this interaction

            /**
             * If is chat input command
             */
            if (interaction.isCommand()) {
              const _sub_command_group = interaction.options.getSubcommandGroup(false); // Get sub command group name
              const _sub_command = interaction.options.getSubcommand(false); // Get sub command name

              if (_sub_command_group) {
                /**
                 * If interaction includes group command
                 */

                if (command.options) {
                  /**
                   * If command contains options
                   */

                  const sub_command_group: CommandOptionData<'base'> | undefined = command.options.get(_sub_command_group); // Get sub command group
                  if (!sub_command_group) return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUP(_sub_command_group));

                  if (sub_command_group.permissions && !(await checkPermissions(interaction, sub_command_group.permissions))) return; // Check permissions of sub command group

                  if (_sub_command) {
                    /**
                     * If command group includes sub command
                     */

                    if (sub_command_group.options) {
                      /**
                       * If command group contains sub command
                       */
                      const sub_command: CommandOptionData<'sub'> | undefined = sub_command_group.options.get(_sub_command); // Get sub command
                      if (!sub_command) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(_sub_command));

                      if (sub_command.permissions && !(await checkPermissions(interaction, sub_command.permissions))) return; // Check permissions of sub command

                      if (sub_command.exec) sub_command.exec(args as CommandOptionDataParams); // Exec guild sub command

                      // [end] If command group contains sub command
                    } else return interaction.reply(contents.commands.MISSING_SUB_COMMANDS(_sub_command_group)); // If group not contains sub command
                  } // [end] If command group includes sub command

                  // [end] If command contains options
                } else return interaction.reply(contents.commands.MISSING_SUB_COMMAND_GROUPS(name)); // if command not contain option

                // [end] If interaction includes group command
              } else if (_sub_command) {
                /**
                 * If interaction includes sub command
                 */
                if (command.options) {
                  /**
                   * If command contains sub commands
                   */

                  const sub_command: CommandOptionData<'base'> | undefined = command.options.get(_sub_command);
                  if (!sub_command) return interaction.reply(contents.commands.MISSING_SUB_COMMAND(_sub_command));

                  if (sub_command.permissions && !(await checkPermissions(interaction, sub_command.permissions))) return; // Check permissions of sub command

                  if (sub_command.exec) await sub_command.exec(args as CommandOptionDataParams); // Exec guild sub command

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

          if (button.exec) await button.exec({ ...options.custom_params, sucrose, interaction }); // Exec button

          // [end] Buttons handler
        } else if (interaction.isSelectMenu()) {
          /**
           * Select_menus handler
           */

          const select_menu = this.select_menus.get(interaction.customId); // Get SelectMenu
          if (!select_menu) return;

          if (select_menu.permissions && !(await checkPermissions(interaction, select_menu.permissions))) return; // Check select_menu permissions

          if (select_menu.exec) await select_menu.exec({ ...options.custom_params, sucrose, interaction }); // Exec select_menu

          // [end] Select_menus handler
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
        const content = () => `${StringProgressBar(cache.i + 1, files.length)}/${files.length} select_menus processed`;
        const loading = new ConsoleLoading(content()); // Start loading console line

        /**
         * Loop all select_menus
         */
        for await (const file of files) {
          cache.i++;

          try {
            const select_menu = await import(`../../interactions/select_menus/${file}`);
            this.load({ select_menu }, file);
          } catch (error) {
            if (error instanceof Error) cache.errors.push(error);
          }

          loading.content = content(); // set new state in loading console line
        } // [end] Loop all select_menus

        loading.clear(); // clear loading console line

        if (cache.errors.length) throw cache.errors; // throw all errors of interaction section
        Logger.log(`${files.length} select_menus loaded`, 'INTERACTION_MANAGER');
      } // [end] Loop all select_menus files
    } // [end] Build select menus
  } // [end] Build interactions manager

  /**
   * Load interaction
   * @param interactions
   * @param file
   */
  private load(interactions: { button?: Button<'base' | 'link'>; select_menu?: SelectMenu }, file: string): void {
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
    } else if (interactions.select_menu) {
      /**
       * If this interaction is a select_menu
       */

      const select_menu = interactions.select_menu; // Get select_menu

      if (!select_menu.data) throw new SucroseError('ERROR', 'INTERACTION_MISSING_DATA');
      if (!select_menu.data.customId) throw new SucroseError('ERROR', 'INTERACTION_MISSING_ID');
      select_menu.data.type = 'SELECT_MENU'; // Defined intertaction type to select_menu data

      this.select_menus.set(select_menu.data.customId, select_menu);
    }
  } // [end] Load interaction
}
