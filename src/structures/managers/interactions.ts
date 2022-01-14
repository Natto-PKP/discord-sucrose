/* Dependencies */
import { readdirSync, existsSync, lstatSync } from 'fs-extra';
import path from 'path';

/* Typing */
import {
  Button,
  ChatInputData,
  ChatInputSubCommandGroupData,
  Collection,
  DiscordCommand,
  InteractionManagerOptions,
  SelectMenu,
} from '../typings';
import { Sucrose } from '../sucrose';

/* Service */
import { SucroseError, Logger, ConsoleLoading } from '../services/logger';
import { hasPermissions, stringProgressBar } from '../services/util';
import Contents from '../contents';

//? Interactions manager and handler
export class InteractionManager {
  /**
   * @property
   * @public
   * @type { Collection<Button<'base' | 'link'>> }
   */
  public buttons: Collection<Button<'base' | 'link'>> = new Map();

  /**
   * @property
   * @public
   * @type { Collection<SelectMenu> }
   */
  public selectMenus: Collection<SelectMenu> = new Map();

  /**
   * @constructor
   * @public
   * @param { Sucrose } sucrose
   * @param { InteractionManagerOptions } options
   */
  public constructor(sucrose: Sucrose, options: InteractionManagerOptions) {
    const { customParams = {} } = options;

    //? Listen interactionCreate event and handle interactions/commands
    sucrose.on('interactionCreate', async (interaction) => {
      try {
        const params = { sucrose, ...customParams };
        const guild = interaction.guild;

        if (interaction.isCommand() || interaction.isContextMenu()) {
          //? Handle commands and context menus

          const name = interaction.commandName;
          const commands = (guild && sucrose.commands.guilds.get(guild.id)) || sucrose.commands.global;
          const command = commands.get(name) || sucrose.commands.global.get(name);
          if (!command) return;

          const permission = guild && (await hasPermissions(interaction, command.permissions || {}));
          if (permission && !permission.check)
            return permission.content ? await interaction.reply(permission.content) : undefined;

          //? handle commands
          if (interaction.isCommand()) {
            const chatInput = <ChatInputData>command;
            const groupName = interaction.options.getSubcommandGroup(false);
            const optionName = interaction.options.getSubcommand(false);

            //? handle sub command group / sub command
            if (groupName || optionName) {
              const opts = chatInput.options;
              if (!opts) return await interaction.reply(Contents.MISSING_SUB_COMMAND_GROUPS(command.body.name));
              const option = groupName ? opts.get(groupName) : optionName ? opts.get(optionName) : null;
              if (!option) return await interaction.reply(Contents.MISSING_SUB_COMMAND_GROUP(command.body.name));

              const permission = guild && (await hasPermissions(interaction, option.permissions || {}));
              if (permission && !permission.check)
                return permission.content ? await interaction.reply(permission.content) : undefined;

              //? handle sub command
              if (option.option.type === 'SUB_COMMAND_GROUP') {
                const opts = (<ChatInputSubCommandGroupData>option).options;
                if (!opts) return await interaction.reply(Contents.MISSING_SUB_COMMANDS(command.body.name));
                const subOption = optionName && opts.get(optionName);
                if (!subOption) return await interaction.reply(Contents.MISSING_SUB_COMMAND(command.body.name));

                const permission = guild && (await hasPermissions(interaction, subOption.permissions || {}));
                if (permission && !permission.check)
                  return permission.content ? await interaction.reply(permission.content) : undefined;

                if (!subOption.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(name));
                return await subOption.exec({ ...params, interaction }); //? Sub command
              } //? [end] handle sub command

              if (!option.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(name));
              return await option.exec({ ...params, interaction }); //? Sub command
            } //? [end] handle sub command group / sub command

            if (!command.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(name));
            return await command.exec({ ...params, interaction: <DiscordCommand>interaction }); //? Command
          } //? [end] handle commands

          if (!command.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(name));
          return await command.exec({ ...params, interaction: <DiscordCommand>interaction }); //? ContextMenu
        } //? Handle buttons
        else if (interaction.isButton()) {
          const button = this.buttons.get(interaction.customId);
          if (!button) return;

          const permission = guild && (await hasPermissions(interaction, button.permissions || {}));
          if (permission && !permission.check)
            return permission.content ? await interaction.reply(permission.content) : undefined;

          if (!button.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(interaction.customId));
          return await button.exec({ ...params, interaction });
        } //? Handle selectMenus
        else if (interaction.isSelectMenu()) {
          const selectMenu = this.selectMenus.get(interaction.customId);
          if (!selectMenu) return;

          const permission = guild && (await hasPermissions(interaction, selectMenu.permissions || {}));
          if (permission && !permission.check)
            return permission.content ? await interaction.reply(permission.content) : undefined;

          if (!selectMenu.exec) return interaction.reply(Contents.MISSING_LOCAL_INTERACTION_EXEC(interaction.customId));
          return await selectMenu.exec({ ...params, interaction });
        }
      } catch (errors) {
        if (errors instanceof Error) Logger.error(errors);
        if (Array.isArray(errors) && errors.every((err) => err instanceof Error)) Logger.handler(errors);
      }
    }); //? [end] Listen interactionCreate event and handle interactions/commands
  }

  /**
   * build all interactions
   * @method
   * @public
   * @async
   * @returns { Promise<void> }
   */
  public async build(): Promise<void> {
    const buttonPath = path.resolve(__dirname, '../../interactions/buttons');
    const selectMenuPath = path.resolve(__dirname, '../../interactions/select_menus');

    //? Build buttons
    if (existsSync(buttonPath)) {
      const files = readdirSync(buttonPath).filter((file) => lstatSync(path.join(buttonPath, file)).isFile());
      if (!files.length) return;

      const cache = { errors: <Error[]>[], i: 0 };
      const content = () => `${stringProgressBar(cache.i + 1, files.length)}/${files.length} buttons processed`;
      const loading = new ConsoleLoading(content()); // Start loading console line

      //? Loop all buttons files
      for await (const file of files) {
        cache.i++;

        try {
          const button = (await import(`../../interactions/buttons/${file}`)).default;
          this.load({ button });

          loading.content = content(); // set new state in loading console line
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
        }
      } //? [end] Loop all buttons files

      loading.clear(); // clear loading console line

      if (cache.errors.length) throw cache.errors; // throw all errors of interaction section
      Logger.log(`${files.length} buttons loaded`, 'INTERACTION_MANAGER');
    } //? [end] Build buttons

    //? Build select menus
    if (existsSync(selectMenuPath)) {
      const files = readdirSync(selectMenuPath);
      if (!files.length) return;

      const cache = { errors: <Error[]>[], i: 0 };
      const content = () => `${stringProgressBar(cache.i + 1, files.length)}/${files.length} selectMenus processed`;
      const loading = new ConsoleLoading(content()); // Start loading console line

      //? Loop all select menus
      for await (const file of files) {
        cache.i++;

        try {
          const selectMenu = (await import(`../../interactions/select_menus/${file}`)).default;
          this.load({ selectMenu });

          loading.content = content(); // set new state in loading console line
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
        }
      } //? [end] Loop all selectMenus

      loading.clear(); // clear loading console line

      if (cache.errors.length) throw cache.errors; // throw all errors of interaction section
      Logger.log(`${files.length} select_menus loaded`, 'INTERACTION_MANAGER');
    } //? [end] Build select menus
  } //? [end] build

  /**
   * @method
   * @private
   * @async
   * @param interactions
   */
  private load(interactions: { button?: Button<'base' | 'link'>; selectMenu?: SelectMenu }): void {
    if (interactions.button) {
      //? If this interaction is a button

      const button = interactions.button; // Get button

      if (!button.data) throw new SucroseError('ERROR', 'INTERACTION_MISSING_DATA');
      button.data.type = 'BUTTON'; // Define interaction type to button data

      if ('customId' in button.data) {
        //? If is classic button

        if (!button.data.customId) throw new SucroseError('ERROR', 'INTERACTION_MISSING_ID');
        this.buttons.set(button.data.customId, button);
      } else if ('url' in button.data) {
        //? If is url button

        if (!button.data.url) throw new SucroseError('ERROR', 'INTERACTION_MISSING_URL');
        button.data.style = 'LINK'; // Define style to url button
        this.buttons.set(button.data.url, button);
      }

      //? [end] If this interaction is a button
    } else if (interactions.selectMenu) {
      //? If this interaction is a selectMenu

      const selectMenu = interactions.selectMenu; // Get selectMenu

      if (!selectMenu.data) throw new SucroseError('ERROR', 'INTERACTION_MISSING_DATA');
      if (!selectMenu.data.customId) throw new SucroseError('ERROR', 'INTERACTION_MISSING_ID');
      selectMenu.data.type = 'SELECT_MENU'; // Defined intertaction type to selectMenu data

      this.selectMenus.set(selectMenu.data.customId, selectMenu);
    }
  } //? [end] Load interaction
}
