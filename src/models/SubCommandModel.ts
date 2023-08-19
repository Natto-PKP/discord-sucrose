import { SubCommand, type SubCommandBody } from '../structures/SubCommand';

/**
 * Sub command model
 * @public
 * @example
 * ```ts
 * import { SubCommandModel } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * export default class MySubCommand extends SubCommandModel {
 *   public override label = 'my-sub-command';
 *
 *   public override body = {
 *     type: ApplicationCommandOptionType.Subcommand,
 *     name: 'my-sub-command',
 *     description: 'My sub command',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class SubCommandModel extends SubCommand {
  public abstract override label: string;

  public abstract override body: SubCommandBody;
}
