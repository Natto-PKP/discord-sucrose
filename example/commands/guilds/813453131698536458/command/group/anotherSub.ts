import type { ChatInputSubCommand } from '../../../../../../typings/index';

export default <ChatInputSubCommand>{
  option: {
    name: 'sub',
    description: 'Sub commands',
  },

  exec: () => console.log('A sub command of group'),
};
