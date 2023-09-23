import Discord from 'discord.js';
import { BaseInteraction, type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';
import { SubCommand, type SubCommandData } from './SubCommand';

/**
 * Body of the sub command group, discord.js will handle this
 * @public
 */
export type SubCommandGroupBody = Discord.SlashCommandSubcommandGroupBuilder
| Discord.ApplicationCommandSubGroupData;

/**
 * Sub command group params
 * @public
 */
export interface SubCommandGroupParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction;
}

/**
 * Sub command group data
 * @public
 * @example
 * ```ts
 * import { SubCommandGroupData } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * export default <SubCommandGroupData>{
 *   label: 'my-sub-command-group',
 *   body: {
 *     name: 'my-sub-command-group',
 *     description: 'My sub command group',
 *     type: ApplicationCommandOptionType.SubcommandGroup,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface SubCommandGroupData
  extends BaseInteractionData<SubCommandGroupParams, SubCommandGroupBody> {
  /**
   * Sub command group options
   */
  options?: (SubCommandData | SubCommand)[] | null;
}

/**
 * Sub command group
 * @public
 * @example
 * ```ts
 * import { SubCommandGroup } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const subCommandGroup = new SubCommandGroup();
 * subCommandGroup.setLabel('my-sub-command-group');
 * subCommandGroup.setExecute(() => console.log('Hello world!'));
 * subCommandGroup.setBody({
 *   name: 'my-sub-command-group',
 *   description: 'My sub command group',
 *   type: ApplicationCommandOptionType.SubcommandGroup,
 * });
 *
 * export default subCommandGroup;
 * ```
 * @example
 * ```ts
 * import { SubCommandGroup } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const data = <SubCommandGroupData>{
 *   label: 'my-sub-command-group',
 *   body: {
 *     name: 'my-sub-command-group',
 *     description: 'My sub command group',
 *     type: ApplicationCommandOptionType.SubcommandGroup,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default data;
 * ```
 */
export class SubCommandGroup
  extends BaseInteraction<SubCommandGroupParams, SubCommandGroupBody> {
  public options?: Discord.Collection<string, SubCommand> | null;

  public override get data(): SubCommandGroupData {
    return {
      ...super.data,
      options: this.options?.map((option) => option.data) || null,
    };
  }

  /**
   * Add sub command options
   * @param options - Sub command options
   * @returns - this
   */
  public addOptions(...options: SubCommand[]): this {
    if (!this.options) this.options = new Discord.Collection();

    options.forEach((option) => {
      if (!option.label) return;
      this.options?.set(option.label, option);
    });

    return this;
  }

  /**
   * Remove sub command options
   * @param options - Sub command options
   * @returns - this
   */
  public removeOptions(...options: SubCommand[]): this {
    if (!this.options) return this;

    options.forEach((option) => {
      if (!option.label) return;
      this.options?.delete(option.label);
    });

    return this;
  }

  /**
   * Set sub command options
   * @param options - Sub command options
   * @returns - this
   */
  public setOptions(options: SubCommand[]): this {
    if (!this.options) this.options = new Discord.Collection();
    this.options.clear();

    options.forEach((option) => {
      if (!option.label) return;
      this.options?.set(option.label, option);
    });

    return this;
  }
}
