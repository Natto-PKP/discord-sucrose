import type { Params } from '../../../typings/index';

export default ({ args: [message] }: Params<'messageCreate'>) => {
  if (message.content.includes('ferret')) message.channel.send('I love ferret');
};
