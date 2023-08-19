import { Command, type CommandBody } from '../structures/Command';

/**
 * Command model
 * @public
 * @example
 * ```ts
 * import { CommandModel } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default class MyCommand extends CommandModel {
 *   public override label = 'my-command';
 *
 *   public override body = {
 *     name: 'my-command',
 *     description: 'My command',
 *     type: ApplicationCommandType.ChatInput,
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class CommandModel extends Command {
  public abstract override label: string;

  public abstract override body: CommandBody;
}
