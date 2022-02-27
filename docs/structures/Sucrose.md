## `class` Sucrose `extends` [Discord.Client](https://discord.js.org/#/docs/discord.js/stable/class/Client)

- [properties](#properties)
  - [commands](#public-readonly-commands)
  - [interactions](#public-readonly-interactions)
  - [events](#public-readonly-events)
- [methods](#methods)
  - [build](#static-async-buildoptions)

### # properties

> #### `public` `readonly` commands
>
> [CommandManager](../managers/CommandManager.md)

> #### `public` `readonly` interactions
>
> [InteractionManager](../managers/InteractionManager.md)

> #### `public` `readonly` events
>
> [EventManager](../managers/EventManager.md)

### # methods

> #### `static` `async` build(options)
>
> Add event
>
> <details>
>
> | parameters |                     type                     | optional |
> | :--------: | :------------------------------------------: | :------: |
> |  options   | [SucroseOptions](../types/SucroseOptions.md) |  false   |
>
> ##### example
>
> ```js
> await Sucrose.build({
>   intents: [Intents.FLAGS.GUILDS],
>   env: { source: './src', extension: 'ts' },
>   token: 'your discord bot token',
> });
> ```
>
> `return` Promise\<this>
>
> </details>
