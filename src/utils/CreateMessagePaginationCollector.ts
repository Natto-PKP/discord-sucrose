import Discord from 'discord.js';
import { MessagePaginationCollector, type MessagePaginationCollectorOptions } from './MessagePaginationCollector';

/**
 * create pagination collector for a message or reply response (interaction) with dynamic pages
 * @param message - Message or interaction response
 * @param options - Options
 * @returns - Message pagination collector
 * @example
 * ```ts
 * import { CreateMessagePaginationCollector } from 'sucrose';
 * import Discord from 'discord.js';
 *
 * const message = await randomChannel.send('Hello');
 * const collector = await CreateMessagePaginationCollector(message);
 *
 * collector.on('first', () => console.log('first'));
 * collector.on('last', () => console.log('last'));
 * collector.on('next', () => console.log('next'));
 * collector.on('previous', () => console.log('previous'));
 * collector.on('ask_page_number', () => console.log('ask_page_number'));
 * ```
 */
export async function CreateMessagePaginationCollector(
  message: Discord.Message | Discord.InteractionResponse,
  options: MessagePaginationCollectorOptions = { },
) {
  const msg = message instanceof Discord.Message ? message : await message.fetch();

  const collector = new MessagePaginationCollector(msg, options);
  await collector.addNavigations();
  await collector.listen();

  return collector;
}
