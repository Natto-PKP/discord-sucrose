import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

import type Discord from 'discord.js';
import type Types from '../../typings';

import { SucroseError } from '../errors';
import Logger from '../services/Logger';
import FolderService from '../services/FolderService';

export default class BaseInteractionCommandManager implements Types.BaseInteractionCommandManager {
  public cache: Collection<string, Types.InteractionCommandData> = new Collection();

  protected builded = false; // prevent build multiple time

  public directory: Types.DirectoryValue<true>;

  protected logger: Logger;

  public constructor(
    protected sucrose: Types.Sucrose,
    protected options: Types.BaseInteractionCommandManagerOptions,
  ) {
    this.logger = new Logger(options.logging);
    this.directory = options.directory;
  }

  /**
   * Load and set a new command
   * @param file
   */
  public async add(command: Types.InteractionCommandData): Promise<Types.InteractionCommandData> {
    const { options } = this;

    // # check command name
    if (this.cache.has(command.body.name)) throw new SucroseError('ERROR', `command "${command.body.name}" already exists in collection`);

    // # command is a chat input
    if (!command.body.type || command.body.type === ApplicationCommandType.ChatInput) {
      const chatInput = command as Types.ChatInputData; // cast to chat input

      // # get path to potential command options folder
      const chatInputOptionsPath = path.join(path.dirname(command.path), chatInput.body.name);

      // # get all valid option file
      const chatInputOptions = FolderService.search({
        path: chatInputOptionsPath,
        filter: { type: 'file', ext: options.env.ext },
      });

      // # check if command options folder exist and is valid
      if (chatInputOptions.length) {
        // # init options repertory
        chatInput.body.options = [];
        chatInput.options = new Collection();

        // # loop all options file
        await Promise.all(chatInputOptions.map(async (chatInputOptionPath) => {
          // # import chat input option
          const chatInputOption = await FolderService.load(chatInputOptionPath, 'option') as Types.ChatInputOptionData;
          if (!chatInputOption) return;

          chatInputOption.path = chatInputOptionPath; // save option path

          // # if option is a group
          if (chatInputOption.body.type === ApplicationCommandOptionType.SubcommandGroup) {
            // # get group folder path
            const chatInputGroup = chatInputOption as Types.ChatInputSubGroupOptionData; // cast
            const chatInputGroupPath = path.join(chatInputOptionsPath, chatInputGroup.body.name);

            // # check if group folder path is valid
            if (!existsSync(chatInputGroupPath)) throw new SucroseError('ERROR', `sub command group "${`${chatInput.body.name} ${chatInputGroup.body.name}`}" folder not exist`);
            if (!lstatSync(chatInputGroupPath).isDirectory()) throw new SucroseError('ERROR', `sub command group "${`${chatInput.body.name} ${chatInputGroup.body.name}`}" folder is not a folder`);

            // # get all option in the group folder
            const chatInputGroupOptions = FolderService.search({
              path: chatInputOptionPath,
              filter: { type: 'file', ext: options.env.ext },
            });

            // # throw an error if group have no option
            if (!chatInputGroupOptions.length) throw new SucroseError('ERROR', 'sub command group has no sub command');

            // # init group options repertory
            chatInputGroup.body.options = [];
            chatInputGroup.options = new Collection();

            // # loop all group sub command files
            await Promise.all(chatInputGroupOptions.map(async (groupOptionFile) => {
              // # import group option
              const chatInputGroupOptionPath = path.join(chatInputGroupPath, groupOptionFile);
              const chatInputGroupOption = await FolderService.load(chatInputGroupOptionPath, 'option') as Types.ChatInputSubOptionData;
              if (!chatInputGroupOption) return;

              chatInputGroupOption.path = chatInputGroupOptionPath; // save path

              // # add sub option in group options
              chatInputGroup.body.options?.push(chatInputGroupOption.body);
              chatInputGroup.options.set(chatInputGroupOption.body.name, chatInputGroupOption);
            }));

            // # add group in chat input options
            chatInput.body.options?.push(chatInputGroup.body);
            chatInput.options.set(chatInputGroup.body.name, chatInputGroup);

            // # if option is a sub command
          } else if (chatInputOption.body.type === ApplicationCommandOptionType.Subcommand) {
            const chatInputSubOption = chatInputOption as Types.ChatInputSubOptionData; // cast

            // # add option in chat input options
            chatInput.body.options?.push(chatInputSubOption.body);
            chatInput.options?.set(chatInputSubOption.body.name, chatInputSubOption);
          }
        }));
      }
    }

    this.cache.set(command.body.name, command);

    return command;
  }

  /**
   * Send a existing command in discord api
   * @param name
   */
  public async deploy(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    // # get guildId if exist
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;

    const command = this.cache.get(name); // get command
    if (!command) throw new SucroseError('ERROR', `command "${name}" not exist`);

    // # send command body to discord API
    return this.sucrose.application?.commands.create(command.body, guildId);
  }

  /**
   * Delete a existing command in discord api
   * @param name
   */
  public async undeploy(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    // # get guildId if exist
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;

    if (!this.cache.has(name)) throw new SucroseError('ERROR', `command "${name}" not exist`);

    // # delete command body from discord API
    return this.sucrose.application?.commands.delete(name, guildId);
  }

  /**
   * Delete and add an existing command
   * @param name
   */
  public async refresh(name: string): Promise<Types.InteractionCommandData> {
    const command = this.cache.get(name); // get command
    if (!command) throw new SucroseError('ERROR', `command "${name}" not exist`);

    this.cache.delete(name); // delete command from collection
    return this.add(command); // add command to collection
  }

  /**
   * Delete a command
   */
  public delete(name: string): boolean {
    return this.cache.delete(name);
  }

  /**
   * Remove and define an existing command
   * @param name
   */
  public async restore(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    await this.undeploy(name);
    return this.deploy(name);
  }
}
