import path from 'path';
import { existsSync, readdirSync, lstatSync } from 'fs';

import { Logger } from '../services/logger';
import { SError, STypeError } from '../services/errors';
import { stringProgressBar } from '../utils/stringProgressBar';
import { hasPermissions } from '../utils/hasPermissions';
import { Collection } from '../utils/Collection';

/* Types */
import type Types from '../../typings';

export class InteractionManager implements Types.InteractionManager {
  public buttons: Types.Collection<string, Types.ButtonData> = new Collection();
  public selectMenus: Types.Collection<string, Types.SelectMenuData> = new Collection();

  /**
   * Manage interactionCreate discord client event
   * @param sucrose
   * @param options
   */
  public constructor(sucrose: Types.Sucrose, private options: Types.InteractionManagerOptions) {
    const { contents } = options;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sucrose.on('interactionCreate', async (interaction): Promise<any> => {
      try {
        const params = { sucrose };
        const guild = interaction.guild;

        // ! command / context menu
        if (interaction.isCommand() || interaction.isContextMenu()) {
          const name = interaction.commandName;
          const commands = (guild && sucrose.commands.guilds.get(guild.id)) || sucrose.commands.global;
          const command = commands.get(name) || sucrose.commands.global.get(name);
          if (!command) return;

          // # check command permissions
          const missing = await hasPermissions(contents, interaction, command.permissions);
          if (missing) return await interaction.reply(missing);

          // ! command
          if (interaction.isCommand()) {
            const chatInput = <Types.ChatInputData>command;
            const groupName = interaction.options.getSubcommandGroup(false);
            const optionName = interaction.options.getSubcommand(false);

            // ! group
            if (groupName) {
              const group = <Types.SubCommandGroupData>chatInput.options?.get(groupName);
              if (!group || group.option.type !== 'SUB_COMMAND_GROUP')
                return await interaction.reply(contents.MISSING_SUB_COMMAND_GROUP(name));

              // # check group permissions
              const missing = await hasPermissions(contents, interaction, group.permissions);
              if (missing) return await interaction.reply(missing);

              // ! group sub command
              if (optionName) {
                const sub = group.options.get(optionName);
                if (!sub) return await interaction.reply(contents.MISSING_SUB_COMMAND(name));

                // # check group sub command permissions
                const missing = await hasPermissions(contents, interaction, sub.permissions);
                if (missing) return await interaction.reply(missing);

                // # exec group sub command
                if (!sub.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
                return await sub.exec({ ...params, interaction });
              } // [end] group sub command
            } // [end] group

            // ! sub command
            if (optionName) {
              const sub = <Types.SubCommandData>chatInput.options?.get(optionName);
              if (!sub) return await interaction.reply(contents.MISSING_SUB_COMMAND(name));

              // # check sub command permissions
              const missing = await hasPermissions(contents, interaction, sub.permissions);
              if (missing) return await interaction.reply(missing);

              // # exec sub command
              if (!sub.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
              return await sub.exec({ ...params, interaction });
            } // [end] sub command

            // # exec command
            if (!chatInput.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
            await chatInput.exec({ ...params, interaction });
          } // [end] command
          // ! context menu
          else {
            const context = <Types.UserContextMenuData | Types.MessageContextMenuData>command;

            // ! user context menu
            if (interaction.isUserContextMenu()) {
              if (context.body.type !== 'USER') return interaction.reply(contents.MISSING_COMMAND(name));
              const userContext = <Types.UserContextMenuData>context;

              // # check user context menu permissions
              const missing = await hasPermissions(contents, interaction, userContext.permissions);
              if (missing) return await interaction.reply(missing);

              // # exec user context menu
              if (!userContext.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
              return await userContext.exec({ ...params, interaction });
            } // [end] user context menu
            // ! message context menu
            else if (interaction.isMessageContextMenu()) {
              if (context.body.type !== 'MESSAGE') return interaction.reply(contents.MISSING_COMMAND(name));
              const messageContext = <Types.MessageContextMenuData>context;

              // # check message context menu permissions
              const missing = await hasPermissions(contents, interaction, messageContext.permissions);
              if (missing) return await interaction.reply(missing);

              // # exec message context menu
              if (!messageContext.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
              return await messageContext.exec({ ...params, interaction });
            } // [end] message context menu
          } // [end] context menu
        } // [end] command / context menu
        // ! button
        else if (interaction.isButton()) {
          const id = interaction.customId;
          const button = this.buttons.get(id);
          if (!button) return;

          // # check button permissions
          const missing = await hasPermissions(contents, interaction, button.permissions || null);
          if (missing) return await interaction.reply(missing);

          // # exec button
          if (!button.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(id));
          await button.exec({ ...params, interaction });
        } // [end] button
        // ! select menu
        else if (interaction.isSelectMenu()) {
          const id = interaction.customId;
          const selectMenu = this.selectMenus.get(id);
          if (!selectMenu) return;

          // # check select menu permissions
          const missing = await hasPermissions(contents, interaction, selectMenu.permissions || null);
          if (missing) return await interaction.reply(missing);

          // # exec select menu
          if (!selectMenu.exec) return await interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(id));
          await selectMenu.exec({ ...params, interaction });
        } // [end] select menu
      } catch (err) {
        if (err instanceof Error) Logger.log(err, 'ERROR', 'INTERACTION_MANAGER');
        if (Array.isArray(err)) Logger.handle(err, 'INTERACTION_MANAGER');
      }
    });
  }

  /**
   * Add interaction(s) in collections
   * @param type
   * @param files
   * @example
   * await interactions.refresh('buttons', ['useme', 'clickme']);
   * await interactions.refresh('selectMenus', 'selectMe');
   */
  public async add<T extends keyof Types.InteractionManagerReturn>(
    type: T,
    files: string[]
  ): Promise<Types.InteractionManagerReturn[T][]>;
  public async add<T extends keyof Types.InteractionManagerReturn>(
    type: T,
    files: string
  ): Promise<Types.InteractionManagerReturn[T]>;
  public async add(
    type: unknown,
    files: unknown
  ): Promise<
    | Types.InteractionManagerReturn[keyof Types.InteractionManagerReturn]
    | Types.InteractionManagerReturn[keyof Types.InteractionManagerReturn][]
  > {
    if (!['buttons', 'selectMenus'].includes(<string>type)) throw STypeError('type', 'buttons | selectMenus', type);

    // ! valid types
    if (Array.isArray(files) || typeof files === 'string') {
      const collection = type === 'buttons' ? this.buttons : this.selectMenus;
      const to = path.join(this.options.path, type === 'buttons' ? 'buttons' : 'select-menus');

      const errors = <Error[]>[];
      const results = <Types.InteractionManagerReturn[keyof Types.InteractionManagerReturn][]>[];

      // ? loop all interaction files
      for (const file of Array.isArray(files) ? files : [files]) {
        try {
          const toFile = path.join(to, file);
          if (!existsSync(toFile) || !lstatSync(toFile).isFile())
            throw SError('ERROR', 'INTERACTIONS_MANAGER_MISSING_FILE');

          const interaction = (await import(toFile)).default;
          if (collection.has(interaction.data.customId || interaction.data.url))
            throw SError('ERROR', 'INTERACTIONS_MANAGER_ALREADY_EXIST');

          collection.set(interaction.data.customId || interaction.data.url, interaction);
          results.push(interaction);
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      } // [end] loop all interaction files

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
      return Array.isArray(files) ? results : results[0];
    } // [end] valid types
    else throw STypeError('files', 'string | string[]', files);
  }

  /**
   * Build all interactions
   * @returns
   */
  public async build(): Promise<void> {
    // ! buttons
    const buttonPath = path.join(this.options.path, 'buttons');
    this.buttons = new Collection();
    if (existsSync(buttonPath) && lstatSync(buttonPath).isDirectory()) {
      const files = readdirSync(buttonPath).filter((f) => lstatSync(path.join(buttonPath, f)).isFile());
      if (!files) return;

      const cache = { errors: <Error[]>[], i: 0 };
      const content = () => `${stringProgressBar(cache.i, files.length)} ${cache.i}/${files.length} buttons processed`;
      const loading = new Logger.loading(content());

      // ? loop all buttons files
      for await (const file of files) {
        try {
          await this.add('buttons', file);

          loading.content = content();
          cache.i += 1;
        } catch (err) {
          if (err instanceof Error) cache.errors.push(err);
          if (Array.isArray(err)) cache.errors.push(...err);
        }
      } // [end] loop all buttons files

      loading.clear();

      if (cache.i) Logger.log(`${cache.i} buttons loaded`, 'SUCCESS', 'COMMAND_MANAGER');
      if (cache.errors.length) throw cache.errors;
    } // [end] buttons

    // ! select menus
    const selectMenuPath = path.join(this.options.path, 'select-menus');
    this.selectMenus = new Collection();
    if (existsSync(selectMenuPath) && lstatSync(selectMenuPath).isDirectory()) {
      const files = readdirSync(selectMenuPath).filter((f) => lstatSync(path.join(selectMenuPath, f)).isFile());
      if (!files) return;

      const cache = { errors: <Error[]>[], i: 0 };
      const content = () =>
        `${stringProgressBar(cache.i, files.length)} ${cache.i}/${files.length} selectMenus processed`;
      const loading = new Logger.loading(content());

      // ? loop all buttons files
      for await (const file of files) {
        try {
          await this.add('selectMenus', file);

          loading.content = content();
          cache.i += 1;
        } catch (err) {
          if (err instanceof Error) cache.errors.push(err);
          if (Array.isArray(err)) cache.errors.push(...err);
        }
      } // [end] loop all buttons files

      loading.clear();

      if (cache.i) Logger.log(`${cache.i} selectMenus loaded`, 'SUCCESS', 'COMMAND_MANAGER');
      if (cache.errors.length) throw cache.errors;
    } // [end] select menus
  }

  /**
   * Remove and readd interaction(s)
   * @param type
   * @param names
   * @example
   * await interactions.refresh('buttons', ['useme', 'clickme']);
   * await interactions.refresh('selectMenus', 'selectMe');
   */
  public async refresh<T extends keyof Types.InteractionManagerReturn>(
    type: T,
    names: string[]
  ): Promise<Types.InteractionManagerReturn[T][]>;
  public async refresh<T extends keyof Types.InteractionManagerReturn>(
    type: T,
    names: string
  ): Promise<Types.InteractionManagerReturn[T]>;
  public async refresh(
    type: unknown,
    names: unknown
  ): Promise<
    | Types.InteractionManagerReturn[keyof Types.InteractionManagerReturn][]
    | Types.InteractionManagerReturn[keyof Types.InteractionManagerReturn]
  > {
    if (!['buttons', 'selectMenus'].includes(<string>type)) throw STypeError('type', 'buttons | selectMenus', type);

    // ! valid types
    if (Array.isArray(names) || typeof names === 'string') {
      const collection = type === 'buttons' ? this.buttons : this.selectMenus;
      const array = <string[]>(Array.isArray(names) ? names : [names]);
      if (!collection.hasAll(...array)) throw SError('ERROR', 'INTERACTIONS_MANAGER_MISSING');

      for (const name of names) collection.delete(name);

      const files = array.map((name): string => collection.get(name)?.path || '');

      return await this.add(
        <keyof Types.InteractionManagerReturn>type,
        <string[]>(Array.isArray(names) ? files : files[0])
      );
    } // [end] valid types
    else throw STypeError('names', 'string | string[]', names);
  }
}
