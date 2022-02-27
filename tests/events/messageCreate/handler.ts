import type { EventHandler } from '../../../typings/index';

export const handler: EventHandler<'messageCreate'> = ({ args: [message] }) => {
  message.channel.send('I love ferret');
};
