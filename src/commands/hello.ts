import { Command, Params } from 'src/typings';

export = <Command>{
  options: { global: true },
  body: {
    name: 'hello',
    description: 'test command',
  },

  exec: ({ args: [interaction] }) => {
    interaction; // Pas fini
  },
};
