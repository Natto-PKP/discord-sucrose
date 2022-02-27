## Getting started

- [Installation](#installation)
- [Configuration](#configuration)
- [Sample program](#sample-program)
- [Executing your program](#executing-your-program)
- [Adding a simple command](#adding-a-simple-command)
- [Listening to the ready event](#listening-to-the-ready-event)
- [Register a command to the api](#register-a-command-to-the-api)
- [Restart your program](#restart-your-program)
- [Adding a command with subcommands](#adding-a-command-with-subcommands)
- [Adding a command with subcommand groups](#adding-a-command-with-subcommand-groups)
- [Creating a command for a guild](#creating-a-command-for-a-guild)
- [Creating a button](#creating-a-button)
- [Creating a select menu](#creating-a-select-menu)

Creating a bot with events, interactions and slash commands.

### # Installation

```bash
npm i discord-sucrose
```

This module will also automatically install discord.js

### # Configuration

_sucrose.json_

```json
{
  "token": "your discord bot token",

  "env": {
    "extension": "js", // Specify ts if you're using typescript
    "source": "./" // Root folder of your application
  }
}
```

### # Sample Program

_index.js_

```js
// importing Sucrose from discord-sucrose
const { Sucrose } = require('discord-sucrose');

// importing Intents from discord.js
const { Intents } = require('discord.js');

// importing the sucrose config file
const config = require('./sucrose.json');

// building the sucrose client
Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
```

<details>
<summary>with typescript</summary>

_index.ts_

```ts
// importing Sucrose from discord-sucrose
import { Sucrose } from 'discord-sucrose';

// importing Intents from discord.js
import { Intents } from 'discord.js';

// importing the sucrose config file
import config from './sucrose.json';

// building the sucrose client
Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
```

</details>

### # Executing your program

```bash
node ./index.js
```

Some message should appear in the console indicating the app is working properly.

### # Adding a simple command

- `./commands` Create a commands folder which will contain all of our slash commands
- `./commands/global` Inside of this folder, a global folder should be made that will include our bots global commands.
- `./commands/global/avatar.js` Create a avatar.js file inside of this folder create a avatar slash command.

_./commands/global/avatar.js_

```js
module.exports = {
  // The body is the part that will be sent to the api to create commands
  body: {
    name: 'avatar',
    description: 'Get member avatar',
    options: [
      {
        type: 'USER',
        name: 'user',
        description: 'Member to get avatar',
      },
    ],
  },

  // This function will be called every time a user executes the command /avatar
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
```

<details>
<summary>with typescript</summary>

_./commands/global/avatar.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  // The body is the part that will be sent to the api to create commands
  body: {
    name: 'avatar',
    description: 'Get member avatar',
    options: [
      {
        type: 'USER',
        name: 'user',
        description: 'Member to get avatar',
      },
    ],
  },

  // This function will be called every time a user executes the command /avatar
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
```

</details>

### # Listening to the ready event

- `./events` Create a folder called "events" which will include all of your events
- `./events/ready` Create a folder named after the event you want to listen to
- `./events/ready/handler.js` Create a handler for this event.

_./events/ready/handler.js_

```js
// This function will be executed every time this event is triggered
module.exports = ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
};
```

<details>
<summary>with typescript</summary>

_./events/ready/handler.ts_

```ts
import type { EventHandler } from 'discord-sucrose';

// This function will be executed every time this event is triggered
export const handler: EventHandler<'ready'> = ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
};
```

</details>

### # Register a command to the api

In the handler for your ready event:

> Note that commands can take a certain time before being registered by the API.

_./events/ready/handler.js_

```js
module.exports = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);

  // This line will register the body of the avatar command in the Discord API.
  await sucrose.commands.define('avatar');
};
```

<details>
<summary>with typescript</summary>

_./events/ready/handler.ts_

```ts
import type { EventHandler } from 'discord-sucrose';

export const handler: EventHandler<'ready'> = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);

  // This line will register the body of the avatar command in the Discord API.
  await sucrose.commands.define('avatar');
};
```

</details>

### # Restart your program

```bash
node ./index.js
```

Your event and your commands are now loaded by the structure. Your ready event should write console.log your bots username and you should be able to execute your command.

### # Adding a command with subcommands

_./commands/global/games.js_

```js
module.exports = {
  body: {
    name: 'games',
    description: 'Play games',
  },

  // We don't need a function here since sub commands will handle that
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'games',
    description: 'Play games',
  },

  // We don't need a function here since sub commands will handle that
};
```

</details>

Now we can create a subcommand for our games command

- `./commands/global/games` Create a games folder which will include our subcommands
- `./commands/global/games/rock.js` Create a file for your subcommand.

_./commands/global/games/rock.js_

```js
const choices = ['rock', 'paper', 'couic'];

module.exports = {
  option: {
    name: 'rock',
    description: 'Play rock, paper or couic',
    options: [
      {
        type: 'STRING',
        name: 'choice',
        description: 'rock, paper or couic ?',
        choices: [
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'couic', value: 'couic' },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    // ... The rest of the code ...
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games/rock.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    name: 'rock',
    description: 'Play rock, paper or couic',
    options: [
      {
        type: 'STRING',
        name: 'choice',
        description: 'rock, paper or couic ?',
        choices: [
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'couic', value: 'couic' },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    // ... The rest of the code  ...
  },
};
```

</details>

And add another subcommand

_./commands/global/games/random.js_

```js
module.exports = {
  option: {
    name: 'random',
    description: 'Get random number between 0 and 100',
  }

  exec: ({ interaction }) => {
    interaction.reply(Math.ceil(Math.random() * 100))
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games/random.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    name: 'random',
    description: 'Get random number between 0 and 100'
  }

  exec: ({ interaction }) => {
    interaction.reply(Math.ceil(Math.random() * 100))
  },
};
```

</details>

### # Adding a command with subcommand groups

_./commands/global/image.js_

```js
module.exports = {
  body: {
    name: 'image',
    description: 'Get a image',
  },

  // No need for a function to be executed as it will be handled by subcommand groups
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'image',
    description: 'Get a image',
  },

  // No need for a function to be executed as it will be handled by subcommand groups
};
```

</details>

Now let's create a first subcommand group for our image command

- `./commands/global/image` Create a folder which will include your subcommand groups
- `./commands/global/image/animal.js` Create a file for our "animal" subcommand group

_./commands/global/image/animal.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND_GROUP',
    name: 'animal',
    description: 'Get a animal image',
  },

  // No need for a function to be executed as it will be handled by subcommands in the group
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal.ts_

```ts
import type { SubCommandGroup } from 'discord-sucrose';

export default <SubCommandGroup>{
  option: {
    type: 'SUB_COMMAND_GROUP',
    name: 'animal',
    description: 'Get a animal image',
  },

  // No need for a function to be executed as it will be handled by subcommands in the group
};
```

</details>

Now all you have to do is create a folder for this subcommand group and define your subcommands

- `./commands/global/image/animal` Create a subfolder inside of your image folder for the subcommands of your animal subcommand group
- `./commands/global/image/animal/ferret.js` Create a file for your subcommand

_./commands/global/image/animal/ferret.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND',
    name: 'ferret',
    description: 'Get a ferret image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include ferret image>');
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal/ferret.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'ferret',
    description: 'Get a ferret image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include ferret image>');
  },
};
```

</details>

And another subcommand

_./commands/global/image/animal/cat.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND',
    name: 'cat',
    description: 'Get a cat image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include cat image>');
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal/cat.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'cat',
    description: 'Get a cat image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include cat image>');
  },
};
```

</details>

### # Creating a command for a guild

`<GuildId>` should be replaced by your guild's id

- `./commands/guilds` Create a subfolder for your guild commands
- `./commands/guilds/<GuildId>` Create a subfolder for the guild named with the guild's id
- `./commands/guilds/<GuildId>/say.js` Create a command specific to this guild.

_./commands/guilds/\<GuildId>/say.js_

```js
module.exports = {
  body: {
    name: 'say',
    description: 'say say say say say say',
  },

  exec: ({ interaction }) => {
    interaction.reply('say say say ?');
  },
};
```

</details>

<details>
<summary>with typescript<summary>

_./commands/guilds/\<GuildId>/say.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'say',
    description: 'say say say say say say',
  },

  exec: ({ interaction }) => {
    interaction.reply('say say say ?');
  },
};
```

</details>

### # Creating a button

- `./interactions` Create a subfolder for discord interactions
- `./interactions/buttons` Create a subfolder for your buttons
- `./interactions/buttons/click-me.js` Create a file for this button

_./interactions/buttons/click-me.js_

```js
module.exports = {
  data: {
    type: 'BUTTON',
    customId: 'useme', // Or url
    style: 'DANGER', // Not available for URL buttons
  },

  // You don't need a function if your button is a url button.
  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
```

</details>

<details>
<summary>with typescript<summary>

_./interactions/buttons/click-me.ts_

```ts
// Import button type
import type { Button } from 'discord-sucrose';

// Button<'url'> pour un boutton de type url
export default <Button<'base'>>{
  data: {
    type: 'BUTTON',
    customId: 'useme', // Or url
    style: 'DANGER', // Not available for URL buttons
  },

  // You don't need a function if your button is a url button.
  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
```

</details>

### # Creating a select menu

- `./interactions` Create a folder containing your discord interactions
- `./interactions/select-menus` Create a subfolder for your select menus
- `./interactions/select-menus/select-me.js` Create a file for your select menu

_./interactions/select-menus/select-me.js_

```js
module.exports = {
  data: {
    type: 'SELECT_MENU',
    customId: 'selectme',
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

<details>
<summary>with typescript<summary>

_./interactions/select-menus/select-me.ts_

```ts
// Import select menu type
import type { SelectMenu } from 'discord-sucrose';

export default <SelectMenu>{
  data: {
    type: 'SELECT_MENU',
    customId: 'selectme',
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
