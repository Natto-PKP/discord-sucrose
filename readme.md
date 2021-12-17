# Discord.js bot setup with typescript

This is a Typescript Discord bot structure

> I'm french but my english is bad, this readme contains only exemples to use Sucrose structure

## # Table of contents

- [Config setup](#-config-setup)
- [Create event](#-create-event)
- [Create command](#-create-command)
- [Create button](#-create-button)
- [Create select menu](#-create-selectmenu)

## # Config setup

### Connect client

_src/secret.json_

```bash
# https://discord.com/developers/applications
TOKEN="Your discord bot token"
```

_src/index.ts_

```ts
import { Sucrose } from './structures/sucrose'; // Import bot structure

// Create new Sucrose clien
new Sucrose({ intents: 14319, partials: ['CHANNEL'] });
```

### Client is ready ?

_src/events/ready/handler.ts_

```ts
import { Params } from 'src/typings'; // Import params type

export = {
  /**
   * event listener fonction
   */
  listener: ({ sucrose }: Params<'ready'> /* Select your event type */) => {
    // Code here

    console.log(`${sucrose.user?.username} is online !`);
  },
};
```

### Run bot with typescript

**Terminal** : `npm start`

This command execute index.ts

### Run bot with compiled javascript (prod)

**Terminal** : `npm run start:prod`

> This command compile your typescript files to javascript files in dist folder and run index.js

## # Create event

create a new folder with event name and handler.ts files in events folder

```
- events
    - ready
        - handler.ts
    - messageCreate
        - handler.ts
```

_src/events/messageCreate/handler.ts_

```ts
import { Params } from 'src/typings';

export = {
  listener: ({ sucrose }: Params<'messageCreate'>) => {
    // Code
  },
};
```

## # Create command

### Guild command

_src/commands/guilds/713172382042423352/hello.ts_

```ts
import { Command } from 'src/typings'; // Import Command type

// export your command with type
export = <Command>{
  // Create body of command
  body: {
    name: 'hello', // Name of command
    description: 'test command', // Description of command
  },

  // command function
  exec: async ({ interaction, sucrose }) => {
    // Code here

    const button = sucrose.interactions.buttons.get('useme'); // Get a button
    const url = sucrose.interactions.buttons.get('https://google.com'); // Get a url button
    const select_menu = sucrose.interactions.select_menus.get('selectme'); // Get a select menu

    // If a interaction is not define, return void
    if (!button || !select_menu || !url) return;

    // Reply
    interaction.reply({
      content: 'Hello world !', // message content

      // add components
      components: [
        { type: 'ACTION_ROW', components: [button.data, url.data] },
        { type: 'ACTION_ROW', components: [select_menu.data] },
      ],
    });
  },
};
```

```ts
Sucrose.interactions.commands.create('hello', '713172382042423352');
```

### Global command with sub group commands

> Create base of command

_src/commands/global/command.ts_

```ts
import { Command } from 'src/typings';

// No special change

export = <Command>{
  body: {
    name: 'command',
    description: 'command with group of commands',
  },

  exec: async () => {
    // Code here
  },
};
```

> Create a subcommands group of ur command

_src/commands/global/command/group.ts_

```ts
import { CommandOption } from 'src/typings'; // import CommandOption type

export = <CommandOption>{
  option: {
    type: 'SUB_COMMAND_GROUP', // type of option
    name: 'group',
    description: 'command group',
  },

  exec: async () => {
    // Code here
  },
};
```

_Your commands folder_

```
- commands
    - global
        - command (folder)
            - group.ts (subcommands group)
        - command.ts
    - guilds
```

> Create subcommands in this group

_src/commands/global/command/group/subcommand.ts_

```ts
import { CommandOption } from 'src/typings';

export = <CommandOption>{
  option: {
    type: 'SUB_COMMAND',
    name: 'subcommand',
    description: 'subcommand of a command group',
  },

  exec: async () => {
    // Code here
  },
};
```

_Your command folder_

```
- commands
    - global
        - command (folder)
            - group (folder)
                subcommand.ts (subcommand)
                othersubcommand.ts
            - group.ts
        - command.ts
    - guilds
```

```ts
Sucrose.interactions.commands.create('command');
```

subcommand/subcommandgroup is automaticaly detected and added in command body (if the name of folders in the same of command/subcommandgroup name)

## # Create button

_src/interactions/buttons/useme.ts_

```ts
import { Button } from 'src/typings';

// button base is a basic button type
// button url is a url button type
export = <Button<'base'>>{
  data: {
    customId: 'useme', // id of button
    label: 'Use me',
    style: 'PRIMARY',
  },

  exec: ({ interaction }) => {
    interaction.reply('Yeaaah !');
  },
};
```

## # Create select_menu

_src/interactions/select_menus/selectme.ts_

```ts
import { SelectMenu } from 'src/typings';

// Select menu type
export = <SelectMenu>{
  data: {
    customId: 'selectme', // id of select menu
    options: [{ label: 'here !', value: 'here' }],
  },

  exec: ({ interaction }) => {
    interaction.reply('Heeeeeeere !');
  },
};
```
