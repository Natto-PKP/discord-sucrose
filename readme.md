# Discord.js bot setup with typescript

> I'm french but my english is bad, this readme contains only exemples to use Sucrose structure

This is a Typescript Discord bot structure

- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Discord.js](https://discord.js.org/#/docs/discord.js/stable/general/welcome)

## Documentation

- **managers**
  - [CommandManager](./docs/managers/CommandManager)
  - [Event](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/Event)
  - [EventManager](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/EventManager)
  - [InteractionManager](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/InteractionManager)
- [Sucrose](https://github.com/Natto-PKP/discord.js-typescript/docs/sucrose)

## Table of contents

- [Getting started](#getting-started)
- [Dependencies](#dependencies)

|        commands        | descriptions                             |
| :--------------------: | :--------------------------------------- |
|   `$ npm run build`    | build for production                     |
|     `$ npm start`      | start bot with ts-node in development    |
| `$ npm run start:prod` | build and start in production            |
| `$ npm start:respawn`  | development start with automatic restart |

# Getting started

|       | steps                                                    |
| :---: | :------------------------------------------------------- |
| **1** | [Configure environment](#-configure-environment)         |
| **2** | [Create your first event](#-create-your-first-event)     |
| **3** | [Create yout first command](#-Create-your-first-command) |

## # Configure environment

_Create .env file in base of project_

```env
NODE_ENV="development"
TOKEN="Your discord bot token"
```

**NODE_ENV**:

- "development" to launch with typescript
- "production" for configure to prod version

**TOKEN**:

Get your discord.js bot token in your discord application:

- https://discord.com/developers/applications

> ### ATTENTION: Your token is secret, do not share it

## # Create your first event

_Create ready folder and this handler_

```md
- src
  - events
    - ready
      - handler.ts
```

_Fill in the events/ready/handler.ts file_

```ts
/* Typings */
import { Params } from 'src/structures/typings';

/* Listener */
export default async ({ sucrose }: Params<'ready'>) => {
  console.log('I love ferret');
};
```

## # Create your first command

_Create your command file in global (or a guild folder)_

```md
- src
  - commands
    - global
      - hi.ts
```

_Fill in the commands/global/hi.ts file_

```ts
/* Typings */
import { Command } from 'src/structures/typings';

export default <Command>{
  body: {
    name: 'hi',
    description: 'Say hi',
  },

  exec: ({ interaction }) => {
    interaction.reply('Hiiii !');
  },
};
```

# Dependencies

- [typescript](https://www.npmjs.com/package/typescript)
- [discord.js](https://www.npmjs.com/package/discord.js)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [eslint](https://www.npmjs.com/package/eslint)
- [prettier](https://www.npmjs.com/package/prettier)
- [dotenv](https://www.npmjs.com/package/dotenv)
