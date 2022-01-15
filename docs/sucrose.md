# Table of contents

- [constructor](#-constructor)
- [properties](#-properties)
  - [commands](#public-commands)
  - [events](#public-events)
  - [interactions](#public-interactions)

## # constructor

```ts
new Sucrose(clientOptions, sucroseOptions);
```

|   parameter    |                                               type                                               | optional | default | description                  |
| :------------: | :----------------------------------------------------------------------------------------------: | :------: | :-----: | :--------------------------- |
| clientOptions  |      [clientOptions](https://discord.js.org/#/docs/discord.js/stable/typedef/ClientOptions)      |          |         | Options of discord.js client |
| sucroseOptions | [sucroseOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#sucroseoptions) |   true   |   {}    | Options of sucrose           |

### example:

```ts
new Sucrose({ intents: 14319, partials: ['CHANNEL'] });
```

## # Properties

> ### `public` commands
>
> `return` [CommandManager](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/CommandManager)

> ### `public` events
>
> `return` [EventManager](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/EventManager)

> ### `public` interactions
>
> `return` [InteractionManager](https://github.com/Natto-PKP/discord.js-typescript/docs/managers/InteractionManager)
