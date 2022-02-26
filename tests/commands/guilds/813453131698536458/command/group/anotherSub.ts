import type { SubCommand } from '../../../../../../typings/index';

export default <SubCommand>{
  option: {
    type: "SUB_COMMAND",
    name: 'another',
    description: 'Sub commands',
  },

  exec: () => console.log('A sub command of group'),
};
