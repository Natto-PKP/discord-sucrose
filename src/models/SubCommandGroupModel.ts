import SubCommandGroup, { type SubCommandGroupBody } from '../structures/SubCommandGroup';

/**
 * Sub command group model
 * @public
 * @example
 * ```ts
 * import { SubCommandGroupModel } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * export default class MySubCommandGroup extends SubCommandGroupModel {
 *   public override label = 'my-sub-command-group';
 *
 *   public override body = {
 *     type: ApplicationCommandOptionType.SubcommandGroup,
 *     name: 'my-sub-command-group',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export default abstract class SubCommandGroupModel extends SubCommandGroup {
  public abstract override label: string;

  public abstract override body: SubCommandGroupBody;
}
