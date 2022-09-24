# Discord bot structure using discord.js

### **[[Documentation here]](https://docs.discord.sucrose.xyz/)**

<br>

- [Getting started](#getting-started)

<br>

- [Create a event](#create-a-event)
- [Create a command](#create-a-command)
- [Create a button](#create-a-button)
- [Create a select-menu](#create-a-select-menu)
- [Create a form modal](#create-a-form-modal)
- [Create a autocompletion](#create-a-autocompletion)

<br>

- [Changelog](#changelog)

<br>

## **Getting started**

<details>

<summary>With template</summary>

Click in "Use this template" and create your own repo

- [Javascript](https://github.com/Natto-PKP/discord-sucrose-javascript-template)
- [Typescript](https://github.com/Natto-PKP/discord-sucrose-typescript-template)

#### # Create your repository

On this example, we will start with the javascript template.

- Go to https://github.com/Natto-PKP/discord-sucrose-javascript-template
- Click 'Use template' button and create your repository

#### # Clone your repository

```sh
$ git clone app git@github.com:{userName}/{repositoryName}.git example-bot
$ cd example-bot && code .
```

#### # Install dependencies

```sh
$ npm install
```

#### # Install husky

```sh
$ npx husky install
```

#### # Create .env file

```
TOKEN='discord bot token'
```

> Start bot with `npm start`

</details>

<br>
<br>

### # **Install dependencies**

```sh
npm install discord-sucrose discord.js dotenv
```

### # **Create .env file**

```
TOKEN='discord bot token'
```

<br>

### # **Setup Sucrose structure**

_Create index.js_

```js
const { Sucrose } = require('discord-sucrose');
const { GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

Sucrose.build({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
```

> Start bot with node index.js

<br>

## **Create a event**

- **Create a folder named "events"**, this one will contain all your events
- **Create a folder named "ready" in the "events" folder**, on this example we will base ourselves on the event ready

_/events/ready/handler.js_

```js
/**
 * @type { import('discord-sucrose').EventHandler<'ready'> }
 */
module.exports = ({ sucrose }) => {
  console.log(sucrose.user.username + ' is online !');
};
```

<br>

## **Create a command**

- **Create a folder named "commands"**, this one will contain all your global and guilds commands
- **Create a folder named "global" in the "commands" folder**, on this example we will create a global command
  - For a guild command, you must create a folder named "guilds" as well as a folder named with the id of the guild in question. For example: `/commands/guilds/713172382042423352`

_/commands/global/handler.js_

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInput }
 */
module.exports = {
  body: {
    name: 'command',
    type: ApplicationCommandType.ChatInput,
    description: 'a command',
  },

  exec: async ({ interaction }) => {
    await interaction.reply('I love ferret');
  },
};
```

> Easily place your command online in discord API with `sucrose.commands.define('command');`  
> _For guilds command `sucrose.commands.guilds.get('guildId').define('command');`_

<br>

## **Create a button**

- **Create a folder named "interactions" and in it, create a folder named "buttons"**. This last folder will contain your buttons

_/interactions/buttons/use-me.js_

```js
const { ComponentType, ButtonStyle } = require('discord.js');

/**
 * @type { import('discord-sucrose').Button }
 */
module.exports = {
  data: {
    type: ComponentType.Button,
    customId: 'use-me',
    style: ButtonStyle.Danger,
  },

  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
```

> Get your button with `sucrose.interactions.buttons.collection.get('use-me');`

<br>

## **Create a select-menu**

- **Create a folder named "interactions" and in it, create a folder named "select-menus"**. This last folder will contain your select-menus

_/interactions/select-menus/select-me.js_

```js
const { ComponentType } = require('discord.js');

/**
 * @type { import('discord-sucrose').SelectMenu }
 */
module.exports = {
  data: {
    type: ComponentType.SelectMenu,
    customId: 'select-me',
    placeholder: 'Select me !',
    options: [
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
    ],
  },

  exec: ({ interaction }) => {
    interaction.reply('I LOVE FERRET !!!');
  },
};
```

> Get your select-menu with `sucrose.interactions.selectMenus.collection.get('select-me');`

<br>

## **Create a form modal**

- **Create a folder named "interactions" and in it, create a folder named "forms"**. This last folder will contain your form modals

_/interactions/forms/report.ts_

```js
/**
 * @type { import('discord-sucrose').Form }
 */
module.exports = {
  data: {
    customId: 'create-report',
    title: 'Report ticket',
    components: [
      {
        type: 'ACTION_ROW',
        components: [
          {
            customId: 'report-reason',
            type: 'TEXT_INPUT',
            style: 'SHORT',
            label: 'Indicate the reason for the report',
            required: true,
          },
        ],
      },
      {
        type: 'ACTION_ROW',
        components: [
          {
            customId: 'report-args',
            type: 'TEXT_INPUT',
            style: 'PARAGRAPH',
            label: 'Indicate your problem',
            required: true,
          },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const reason = interaction.fields.getTextInputValue('report-reason');
    const args = interaction.fields.getTextInputValue('report-args');

    console.log(reason, args);
  },
};
```

> Get your form modal with `sucrose.interactions.forms.collection.get('report');`

<br>

## **Create a autocompletion**

- **Create a folder named "interactions" and in it, create a folder named "autocompletions"**. This last folder will contain your autocompletion

_/interactions/autocompletions/_

```js
/**
 * @type { import('discord-sucrose').Autocomplete }
 */
module.exports = {
  body: { command: 'image' },

  exec: ({ interaction }) => {
    const focus = interaction.options.getFocused();

    if (focus === 'animals') {
      /* ... */
    } else if (focus === 'games') {
      /* ... */
    }
  },
};
```

Autocompletion

```js
/**
 * @type { import('discord-sucrose').Autocomplete }
 */
module.exports = {
  body: { command: 'image', option: 'animals' },

  exec: ({ interaction }) => {
    const focus = interaction.options.getFocused();

    /* ... */
  },
};
```

<br>

## **Changelog**

[6.1.6](#616), [6.1.5](#615)

### # `6.1.6`

> #### Readme
>
> ```diff
> + update readme.md
> ```

### # `6.1.5`

> #### EventManager
>
> ```diff
> - emit ready event before sucrose end log
>
> + emit ready event after sucrose end log
> ```

> #### Husky + Commitlint (On template)
>
> ```diff
> + add husky + commit for proper manage your commit
> ```
