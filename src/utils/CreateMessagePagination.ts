import Discord from 'discord.js';
import MessagePaginationCollector, { type MessagePaginationCollectorOptions } from './MessagePaginationCollector';

/**
 * Message pagination page
 * @public
 */
export type MessagePaginationPage = string
| Discord.MessagePayload
| Discord.InteractionReplyOptions
| Discord.MessageCreateOptions;

/**
 * create pagination for a message or reply response (interaction) with static pages
 * @param message - Message or interaction response
 * @param pages - Pages
 * @param options - Options
 * @returns - Message pagination collector
 * @example
 * ```ts
 * import { CreateMessagePagination } from 'sucrose';
 *
 * const pages = [
 *   'Hello world!',
 *   'Hello world 2!',
 *   'Hello world 3!',
 * ];
 *
 * const message = await randomChannel.send('Hello');
 * await CreateMessagePagination(message, pages);
 * ```
 * @example
 * ```ts
 * import { CreateMessagePagination } from 'sucrose';
 *
 * const pages = [
 *   'Hello world!',
 *   'Hello world 2!',
 *   'Hello world 3!',
 * ];
 *
 * const message = await randomChannel.send('Hello');
 * const collector = await CreateMessagePagination(message, pages);
 * collector.on('first', () => console.log('first'));
 * collector.on('last', () => console.log('last'));
 * collector.on('next', () => console.log('next'));
 * collector.on('previous', () => console.log('previous'));
 * collector.on('ask_page_number', () => console.log('ask_page_number'));
 * ```
 */
export default async function CreateMessagePagination(
  message: Discord.Message | Discord.InteractionResponse,
  pages: MessagePaginationPage[],
  options: MessagePaginationCollectorOptions = { },
) {
  const msg = message instanceof Discord.Message ? message : await message.fetch();

  const collector = new MessagePaginationCollector(msg, options);
  await collector.addNavigations();
  await collector.listen();

  const pgs = pages as Discord.MessagePayload[];

  collector.on('first', () => msg.edit(pgs[0]).catch(() => null));
  collector.on('last', () => msg.edit(pgs[pgs.length - 1]).catch(() => null));
  collector.on('next', ({ page }) => msg.edit(pgs[page]).catch(() => null));
  collector.on('previous', ({ page }) => msg.edit(pgs[page]).catch(() => null));
  collector.on('ask_page_number', ({ page }) => msg.edit(pgs[page]).catch(() => null));

  return collector;
}
