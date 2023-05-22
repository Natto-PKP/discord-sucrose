# Discord bot structure using discord.js

### **[[Documentation here]](https://docs.discord.sucrose.xyz/)**

<br>

- [Getting started 🐤](#getting-started)
- [Some examples 🖼️](#some-examples)
- [Changelog 🌐](https://github.com/Natto-PKP/discord-sucrose/blob/main/CHANGELOG.md)
- [F.A.Q](#faq)

#### [🥥 Join our server Discord](https://discord.com/invite/Cd9y3vhWxE)

<br>

## **Getting started**

- [With template (recommended)](#with-template-recommended)
- [Without template](#without-template)

<br>

### **With template (recommended)**

These templates give you an even faster deployment of your Discord bot structure. They also give you the architecture that your Discord bot should have.

#### **# Installation**

**1.** Use [Javascript template](https://github.com/Natto-PKP/discord-sucrose-javascript-template)
or [Typescript template](https://github.com/Natto-PKP/discord-sucrose-typescript-template)  
**2.** Click on "Use this template" and create your own repo  
**3.** Clone this repo in ur computer  
**4.** Go to the repo folder and open a terminal  
**5.** Install all dependencies with `npm install`  
**6.** Install husky with `npx husky install` (optional: for better git commit)  
**Installation done ✔️**

<br>

#### **# Configuration**

**1.** Create a .env file in the repo root  
**2.** Insert this line in: `TOKEN='<discord bot token>'`  
**Configuration done ✔️**

<br>

> Use `npm start` command to start ur discord bot ! ✨

<br>

### **Without template**

<br>

#### **# Installation**

**1.** Create a new folder for ur discord bot and open a terminal in  
**2.** Use this command `npm i discord-sucrose discord.js dotenv`  
**3.** Create ur index file (JS or TS)

```js
const { Sucrose } = require('discord-sucrose');
const { GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config(); // load ur .env file

Sucrose.build({
  // env: { ext: 'ts', source: 'src' }, // (for TS user)
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});
```

**Installation done ✔️**

<br>

#### **# Configuration**

**1.** Create a .env file in the repo root  
**2.** Insert this line in: `TOKEN='<discord bot token>'`  
**Configuration done ✔️**

<br>

#### **# Create structure**

Your project structure should look like this by default:

```
- events
  - guildMemberAdd
    - sendWelcomeMessage.js
    - addDefaultRoles.js
  - ready
    - log.js
- interactions
  - commands
    - global
      - eval.js
      - avatar.js
    - guilds
      - 713172382042423352
        - ferret.js
        - otter.js
      - 874374108912173077
        - random (command group)
          - letter.js
          - number.js
          - user.js
        - random.js
  - autocompletes
    - animals.js
  - buttons
    - use-me.js
    - dont-touch-me.js
  - forms
    - report.js
    - ticket.js
  - select-menus
    - durations.js
    - days.js
    - languages.js
- index.js
```

⚠️ Add these files/folders in ur src folder for Typescript user  
This structure may seem impressive, but it allows for good organization and visibility.  
You can also configure the path of each folder

<br>

## **Some examples**

- **Interaction commands**
  - [Create a new command](#create-a-new-command)
    - [With some permissions](#with-permissions)
    - [With sub commands](#with-sub-commands)
    - [With groups and sub commands](#with-group-and-sub-commands)
  - [Create a new user command](#create-a-new-user-command)
  - [Create a new message command](#create-a-new-message-command)
  - [Register a command to Discord API](#register-a-command-to-discord-api)
  - [Get a command from CommandManager](#get-a-command-from-commandmanager)
- **Events**
  - [Create a new event](#create-a-new-event)
- **Interactions**
  - [Create a new autocomplete](#create-a-new-autocomplete)
  - [Create a new button](#create-a-new-button)
  - [Create a new form](#create-a-new-form)
  - [Create a new select-menu](#create-a-new-select-menu)
  - [Call an interaction in a command](#call-an-interaction-in-a-command)
  - [Create an interaction with permissions](#create-an-interaction-with-permissions)

<br>

### **Create a new command**

**1.** Create a file in ur commands folder (global or guild)  
**2.** Insert the structure and code that command

```js
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInput }
 */
module.exports = {
  body: {
    name: 'say',
    type: ApplicationCommandType.ChatInput,
    description: 'A command who reply what u want',
    options: [
      {
        name: 'text',
        type: ApplicationCommandOptionType.String,
        description: 'The text the bot will say',
        required: true,
      },
    ],
  },

  exec: async ({ interaction }) => {
    const content = interaction.options.getString('text', true);
    await interaction.reply({ content });
  },
};
```

#### **# With permissions**

U can add some permissions in each command

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInput }
 */
module.exports = {
  permissions: [
    {
      // # only usable this channel
      type: 'CHANNEL',
      allowed: ['874380549144338432'],
    },
    {
      // # only usable if the bot have MANAGE_SERVER permission
      type: 'SELF',
      permissions: ['MANAGE_SERVER'],
    },
  ],

  body: {
    name: 'info',
    type: ApplicationCommandType.ChatInput,
    description: 'Get serveur and bot information',
  },

  exec: async ({ interaction }) => {},
};
```

#### **# With sub commands**

Sucrose CommandManager will be check automatically if ur command have sub commands or command groups. For that, u have to build ur command with this structure:

```
- commands
  - global
    - animals.js
    - animals
      - ferret.js
      - otter.js
```

**> animals.js**

U don't have to include the sub command in the command body, the CommandManager will add it

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInput }
 */
module.exports = {
  body: {
    name: 'animals',
    type: ApplicationCommandType.ChatInput,
    description: 'simple command',
  },
};
```

**>** animals/ferret.js

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInputSubOption }
 */
module.exports = {
  body: {
    name: 'ferrets',
    type: ApplicationCommandOptionType.Subcommand,
    description: 'Give u a ferret gif',
    options: [
      {
        name: 'source',
        type: ApplicationCommandOptionType.String,
        description: 'source of image',
        required: true,
      },
    ],
  },

  exec: async ({ interaction }) => {
    const source = interaction.options.getString('source', true);
    await interaction.reply({ content: source + ': [ferret.gif]' });
  },
};
```

> ⚠️ animals/otter.js file will have the same structure

#### **# With group and sub commands**

Sucrose CommandManager will be check automatically if ur command have sub commands or command groups. For that, u have to build ur command with this structure:

```
- commands
  - global
    - animals.js
    - animals
      - ferret.js
      - ferret
        - white.js
        - brown.js
      - otter.js
      - otter
        - brown.js
```

**> animals.js**  
U don't have to include the groups in the command body, the CommandManager will add it

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInput }
 */
module.exports = {
  body: {
    name: 'animals',
    type: ApplicationCommandType.ChatInput,
    description: 'simple command',
  },
};
```

**> animals/ferret.js**  
U don't have to include the sub command in the group body, the CommandManager will add it

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInputSubGroupOption }
 */
module.exports = {
  body: {
    name: 'ferrets',
    type: ApplicationCommandOptionType.SubcommandGroup,
    description: 'Give u a ferret gif',
  },
};
```

**> animals/ferret/white.js**

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').ChatInputSubOption }
 */
module.exports = {
  body: {
    name: 'ferrets',
    type: ApplicationCommandOptionType.Subcommand,
    description: 'Give u a white ferret gif',
    options: [
      {
        name: 'source',
        type: ApplicationCommandOptionType.String,
        description: 'source of image',
        required: true,
      },
    ],
  },

  exec: async ({ interaction }) => {
    const source = interaction.options.getString('source', true);
    await interaction.reply({ content: source + ': [white_ferret.gif]' });
  },
};
```

<br>

### **Create a new user command**

**1.** Create a file in ur commands folder (global or guild)  
**2.** Insert the structure and code that command

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').UserContextCommand }
 */
module.exports = {
  body: {
    name: 'info',
    type: ApplicationCommandType.User,
  },

  exec: () => console.log('this is a user command'),
};
```

### **Create a new message command**

**1.** Create a file in ur commands folder (global or guild)  
**2.** Insert the structure and code that command

```js
const { ApplicationCommandType } = require('discord.js');

/**
 * @type { import('discord-sucrose').MessageContextCommand }
 */
module.exports = {
  body: {
    name: 'info',
    type: ApplicationCommandType.Message,
  },

  exec: () => console.log('this is a message command'),
};
```

### **Register a command to Discord API**

```js
await sucrose.commands.deploy('eval');

const guild = sucrose.commands.guilds.get('874374108912173077');
await guild.deploy('random');
```

### **Get a command from CommandManager**

```js
await sucrose.commands.cache.get('eval');

const guild = sucrose.commands.guilds.cache.get('874374108912173077');
await guild.get('random');
```

### **Create a new event**

**1.** Create a folder in ur events folder  
**2.** Name it with a discord.js [ClientEvents](https://discord.js.org/#/docs/discord.js/main/typedef/Events)  
**3.** Create one or multiple file in this event folder  
**4.** This/These file.s need to have this structure:

```js
/**
 * @type { import('discord-sucrose').EventModule<'ready'> }
 */
module.exports = {
  label: 'ready-log',

  exec: ({ sucrose }) => console.log("I'm here!", sucrose.user.username),
};
```

> If u create multiple file in the event folder, each file will be loaded and used in one and unique event. U can add folder in, and add ur js/ts files in. Folders or files starting with an underscore (ex: \_sources) will be ignored.

### **Create a new autocomplete**

**1.** Create a file in ur interactions/autocompletes folder  
**2.** This file need to have this structure:

```js
/**
 * @type { import('discord-sucrose').Autocomplete }
 */
module.exports = {
  body: { command: 'image' },

  exec: async ({ interaction }) => {
    const focus = interaction.options.getFocused();

    if (focus === 'animals') {
      await interaction.respond([
        { name: 'Ferret', value: 'ferret' },
        { name: 'Cat', value: 'cat' },
        { name: 'Dog', value: 'dog' },
        { name: 'Otter', value: 'Otter' },
      ]);
    } else if (focus === 'games') {
      await interaction.respond([
        { name: 'Minecraft', value: 'minecraft' },
        { name: 'Fortnite', value: 'fortnite' },
        { name: 'Humankind', value: 'humankind' },
        { name: 'Idol Manager', value: 'idol-manager' },
      ]);
    }
  },
};
```

> U can filter by focused option too with option property in body

```js
/**
 * @type { import('discord-sucrose').Autocomplete }
 */
module.exports = {
  body: { command: 'image', option: 'animals' },

  exec: async ({ interaction }) => {
    await interaction.respond([
      { name: 'Ferret', value: 'ferret' },
      { name: 'Cat', value: 'cat' },
      { name: 'Dog', value: 'dog' },
      { name: 'Otter', value: 'Otter' },
    ]);
  },
};
```

### **Create a new button**

**1.** Create a file in ur interactions/buttons folder  
**2.** This file need to have this structure:

```js
const { ComponentType, ButtonStyle } = require('discord.js');

/**
 * @type { import('discord-sucrose').Button }
 */
module.exports = {
  body: {
    type: ComponentType.Button,
    customId: 'useme',
    style: ButtonStyle.Primary,
  },

  exec: async ({ interaction }) => {
    await interaction.reply('Yeeaaaaah !');
  },
};
```

### **Create a new form**

**1.** Create a file in ur interactions/forms folder  
**2.** This file need to have this structure:

```js
const { ComponentType, TextInputStyle } = require('discord.js');

/**
 * @type { import('discord-sucrose').Form }
 */
module.exports = {
  body: {
    customId: 'create-report',
    title: 'Report ticket',
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            customId: 'report-reason',
            type: ComponentType.TextInput,
            style: TextInputStyle.Short,
            label: 'Indicate the reason for the report',
            required: true,
          },
        ],
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            customId: 'report-args',
            type: TextInputStyle.Paragraph,
            style: ComponentType.TextInput,
            label: 'Indicate your problem',
            required: true,
          },
        ],
      },
    ],
  },

  exec: async ({ interaction }) => {
    const reason = interaction.fields.getTextInputValue('report-reason');
    const args = interaction.fields.getTextInputValue('report-args');
    const content = `Someone sent a report: ${reason}\n\`\`\`${args}\`\`\``;

    await interaction.reply({ content });
  },
};
```

### **Create a new select-menu**

**1.** Create a file in ur interactions/forms folder  
**2.** This file need to have this structure:

```js
const { ComponentType } = require('discord.js');

/**
 * @type { import('discord-sucrose').SelectMenu }
 */
module.exports = {
  body: {
    type: ComponentType.StringSelect,
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

  exec: async ({ interaction }) => {
    await interaction.reply('I LOVE FERRET !!!');
  },
};
```

### **Call an interaction in a command**

```js
const { ApplicationCommandType, ActionRow } = require('discord.js');
const useMe = require('../buttons/use-me.js');

/**
 * @type { import('discord-sucrose').ActionRow }
 */
module.exports = {
  body: {
    name: 'command',
    type: ApplicationCommandType.ChatInput,
    description: 'A simple command',
    options: [button.body],
  },

  exec: async ({ interaction, sucrose }) => {
    const buttons = sucrose.interactions.buttons;
    const anotherButton = buttons.get('another-button');

    await interaction.reply({
      content: 'A simple command',
      components: [
        {
          type: ActionRow,
          components: [anotherButton.body],
        },
      ],
    });
  },
};
```

### **Create an interaction with permissions**

```js
const { ComponentType, ButtonStyle } = require('discord.js');

/**
 * @type { import('discord-sucrose').Button }
 */
module.exports = {
  permissions: {
    // This guild is excluded to use the button
    type: 'GUILD',
    denied: ['713172382042423352'],
  },

  body: {
    type: ComponentType.Button,
    customId: 'useme',
    style: ButtonStyle.Primary,
  },

  exec: async ({ interaction }) => {
    await interaction.reply('Yeeaaaaah !');
  },
};
```

## **F.A.Q**

- [What about error handling?](#what-about-error-handling)
- [How can I change errors messages?](#how-can-i-change-errors-messages)
- [Can I use message command?](#can-i-use-message-command)

### **What about error handling?**

> When u throw a error in an interaction or event, it'll be catched by Sucrose Logger  
> So... U don't need to worry about that

### **How can I change errors messages?**

> In sucrose build options, you can change the "contents"
>
> ```js
> Sucrose.build({
>   intents: [GatewayIntentBits.Guilds],
>   partials: [Partials.Channel],
>   contents: {
>     AUTOCOMPLETE_INTERACTION_MISSING: ({ interaction, key }) => {
>       return {
>         content: "I don't want to log",
>         ephemeral: true,
>       };
>     },
>   },
> });
> ```

### **Can I use message command?**

> It's not actually supported by the package, but u always can build your own message command manager with discord.js

### **How can I manager bot shards?**

> It's the same [from discord.js](https://discordjs.guide/sharding/#getting-started-1). Rename your index file to bot file and create a index file with the shardings manager. The process is exactly the same as the guide, expect for Discord Client class is replaced be Sucrose class.
