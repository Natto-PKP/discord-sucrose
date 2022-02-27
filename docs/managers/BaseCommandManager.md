## `class` BaseCommandManager `extends` [BaseManager](./BaseManager.md)

- [methods](#methods)
  - [define](#public-async-definenames)
  - [delete](#public-async-deletenames)
  - [restore](#public-async-restorenames)

### # methods

> #### `public` `async` define(names)
>
> Create command in discord API
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   names    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.define('name');
> await manager.define(['name', 'other-name']);
> ```
>
> `return` Promise<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)[]>
>
> </details>

> #### `public` `async` delete(names)
>
> Delete command in discord API
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   names    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.delete('name');
> await manager.delete(['name', 'other-name']);
> ```
>
> `return` Promise<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)[]>
>
> </details>

> #### `public` `async` restore(names)
>
> Delete and create command in discord API
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   names    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.restore('name');
> await manager.restore(['name', 'other-name']);
> ```
>
> `return` Promise<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)[]>
>
> </details>
