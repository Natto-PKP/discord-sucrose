# Table of contents

- [properties](#-properties)
  - [global](#public-global)
  - [guilds](#public-guilds)
- [methods](#-methods)
  - [create](#public-create)
  - [delete](#public-delete)
  - [edit](#public-edit)
  - [fetch](#public-fetch)
  - [refresh](#public-refresh)

## # Properties

> ### `public` global
>
> Global commands collection  
> `return` [Collection](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#collection)<[CommandData](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#commanddata)>

> ### `public` guilds
>
> Colection of guild commands collection  
> `return` [Collection](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#collection)<[Collection](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#collection)<[CommandData](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#commanddata)>>

## # Methods

> ### `public` create
>
> Create command in discord api
>
> | parameter |                                                        type                                                        | optional | default | description |
> | :-------: | :----------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :---------- |
> |  options  | [BaseLocalCommandOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#baselocalcommandoptions) |   true   |         |             |
>
> #### examples:
>
> ```ts
> await commands.create();
> await commands.create({ guildId: '012345678912345678' });
> await commands.create({ commandName: 'hello' });
> await commands.create({ commandName: 'hello', guildId: '012345678912345678' });
> ```
>
> `return` [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.Collection](https://discord.js.org/#/docs/collection/stable/class/Collection)<[Discord.Snowflake](https://discord.js.org/#/docs/discord.js/stable/typedef/Snowflake), [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)>>

> ### `public` delete
>
> Delete command in discord api
> | parameter | type | optional | default | description |
> | :-------: | :----------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :---------- |
> | options | [BaseAPICommandOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#baseapicommandoptions) | true | | |
>
> #### examples:
>
> ```ts
> await commands.delete();
> await commands.delete({ guildId: '012345678912345678' });
> await commands.delete({ commandId: '012345678912345678' });
> await commands.delete({ commandId: '012345678912345678', guildId: '012345678912345678' });
> ```
>
> `return` [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.Collection](https://discord.js.org/#/docs/collection/stable/class/Collection)<[Discord.Snowflake](https://discord.js.org/#/docs/discord.js/stable/typedef/Snowflake), [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)>>

> ### `public` edit
>
> Edit command in discord api
> | parameter | type | optional | default | description |
> | :-------: | :----------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :---------- |
> | options | [BaseAPICommandOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#baseapicommandoptions) | | | |
> |options.data|[Discord.ApplicationCommandDataResolvable](https://discord.js.org/#/docs/discord.js/stable/typedef/ApplicationCommandData)||||
>
> #### examples:
>
> ```ts
> const data = { description: 'I love ferret' };
>
> await commands.edit({ commandId: '012345678912345678', data });
> await commands.edit({ commandId: '012345678912345678', data, guildId: '012345678912345678' });
> ```
>
> `return` [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)>

> ### `public` fetch
>
> Fetch command in discord api
> | parameter | type | optional | default | description |
> | :-------: | :----------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :---------- |
> | options | [BaseAPICommandOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#baseapicommandoptions) |true | | |
>
> #### examples:
>
> ```ts
> await commands.fetch();
> await commands.fetch({ guildId: '012345678912345678' });
> await commands.fetch({ commandId: '012345678912345678' });
> await commands.fetch({ commandId: '012345678912345678', guildId: '012345678912345678' });
> ```
>
> `return` [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand) | [Discord.Collection](https://discord.js.org/#/docs/collection/stable/class/Collection)<[Discord.Snowflake](https://discord.js.org/#/docs/discord.js/stable/typedef/Snowflake), [Discord.ApplicationCommand](https://discord.js.org/#/docs/discord.js/stable/class/ApplicationCommand)>>

> ### `public` refresh
>
> Refresh local command
> | parameter | type | optional | default | description |
> | :-------: | :----------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :---------- |
> | options | [BaseLocalCommandOptions](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#baselocalcommandoptions) | true | | |
>
> #### examples:
>
> ```ts
> await commands.refresh();
> await commands.refresh({ guildId: '012345678912345678' });
> await commands.refresh({ commandName: 'hello' });
> await commands.refresh({ commandName: 'hello', guildId: '012345678912345678' });
> ```
>
> `return` [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[CommandData](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#commanddata) | [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array)<[CommandData](https://github.com/Natto-PKP/discord.js-typescript/docs/typings#commanddata)>>
