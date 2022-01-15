# Typings

## Table of contents

- [BaseOptions](#baseoptions)
- [SucroseOptions](#baseoptions)
- [BaseEventManagerOptions](#baseeventmanageroptions)
- [Button](#button)
- [SelectMenu](#selectmenu)
- [Command](#commanddata)
- [BaseAPICommandOptions](#baseapicommandoptions)
- [BaseLocalCommandOptions](#baselocalcommandoptions)
- [Collection](#collection)

## Contents

> ### BaseOptions
>
> `return` { CustomParams }

> ### SucroseOptions
>
> `return` [BaseOptions](#baseoptions) & { events?: [BaseEventManagerOptions](#baseeventmanageroptions) }

> ### BaseEventManagerOptions
>
> `return` { ignore?: [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array)<keyof [Discord.ClientEvents](https://discord.js.org/#/docs/discord.js/stable/class/Client)> }

> ### Button
>
> `return` { data: [ButtonData](https://discord.js.org/#/docs/discord.js/stable/typedef/MessageButtonOptions), exec: [function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function) }

> ### SelectMenu
>
> `return` { data: [SelectMenuData](https://discord.js.org/#/docs/discord.js/stable/typedef/MessageSelectOption), exec: [function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function) }

> ### CommandData
>
> `return` ChatInputData | UserContextMenuData | MessageContextMenuData

> ### BaseAPICommandOptions
>
> `return` { commandId: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String), guildId: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) }

> ### BaseLocalCommandOptions
>
> `return` { commandName: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String), guildId: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) }

> ### Collection
>
> `return` [Map](developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String), V>
