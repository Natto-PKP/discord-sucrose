import type { EventHandler } from '../../../typings/index';

export const handler: EventHandler<'messageCreate'> = ({ args: [message] }) => {
  if (message.content.includes('ferret')) message.channel.send('I love ferret');
};
