# discord-sucrose

## Table of contents

### Enumerations

- [Codes](../wiki/Codes)

### client Classes

- [Sucrose](../wiki/Sucrose)

### managers Classes

- [BaseCooldownManager](../wiki/BaseCooldownManager)
- [BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager)
- [BaseInteractionManager](../wiki/BaseInteractionManager)
- [CooldownManager](../wiki/CooldownManager)
- [Event](../wiki/Event)
- [EventManager](../wiki/EventManager)
- [InteractionCommandManager](../wiki/InteractionCommandManager)
- [InteractionGuildCommandManager](../wiki/InteractionGuildCommandManager)
- [InteractionManager](../wiki/InteractionManager)
- [PermissionManager](../wiki/PermissionManager)

### services Classes

- [ConditionService](../wiki/ConditionService)
- [FolderService](../wiki/FolderService)
- [Logger](../wiki/Logger)

### utils Classes

- [AsyncUtil](../wiki/AsyncUtil)

### Other Interfaces

- [AutocompleteData](../wiki/AutocompleteData)
- [ButtonData](../wiki/ButtonData)
- [ChatInputData](../wiki/ChatInputData)
- [ChatInputSubGroupOptionData](../wiki/ChatInputSubGroupOptionData)
- [ChatInputSubOptionData](../wiki/ChatInputSubOptionData)
- [CooldownMethodParams](../wiki/CooldownMethodParams)
- [FormData](../wiki/FormData)
- [LoggerLogStyles](../wiki/LoggerLogStyles)
- [MessageContextCommandData](../wiki/MessageContextCommandData)
- [SelectMenuData](../wiki/SelectMenuData)
- [UserContextCommandData](../wiki/UserContextCommandData)

### bases Interfaces

- [BaseInteraction](../wiki/BaseInteraction)
- [GlobalBase](../wiki/GlobalBase)

### contents Interfaces

- [ConditionContents](../wiki/ConditionContents)
- [CooldownContents](../wiki/CooldownContents)
- [InteractionContents](../wiki/InteractionContents)
- [PermissionContents](../wiki/PermissionContents)

### events Interfaces

- [EventModule](../wiki/EventModule)
- [Events](../wiki/Events)
- [LoggerEvents](../wiki/LoggerEvents)

### features Interfaces

- [Features](../wiki/Features)
- [InteractionFeatures](../wiki/InteractionFeatures)

### hooks Interfaces

- [InteractionHooks](../wiki/InteractionHooks)

### interactions Interfaces

- [Autocomplete](../wiki/Autocomplete)
- [Button](../wiki/Button)
- [ChatInput](../wiki/ChatInput)
- [ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption)
- [ChatInputSubOption](../wiki/ChatInputSubOption)
- [Form](../wiki/Form)
- [MessageContextCommand](../wiki/MessageContextCommand)
- [SelectMenu](../wiki/SelectMenu)
- [UserContextCommand](../wiki/UserContextCommand)

### options Interfaces

- [BaseInteractionCommandManagerOptions](../wiki/BaseInteractionCommandManagerOptions)
- [BaseInteractionManagerOptions](../wiki/BaseInteractionManagerOptions)
- [CommandDirectories](../wiki/CommandDirectories)
- [Directories](../wiki/Directories)
- [EnvironmentOptions](../wiki/EnvironmentOptions)
- [EventManagerOptions](../wiki/EventManagerOptions)
- [EventOptions](../wiki/EventOptions)
- [GlobalOptions](../wiki/GlobalOptions)
- [GuildInteractionCommandManagerOptions](../wiki/GuildInteractionCommandManagerOptions)
- [InteractionCommandManagerOptions](../wiki/InteractionCommandManagerOptions)
- [InteractionDirectories](../wiki/InteractionDirectories)
- [InteractionManagerOptions](../wiki/InteractionManagerOptions)
- [LoggerErrorOptions](../wiki/LoggerErrorOptions)
- [LoggerLogOptions](../wiki/LoggerLogOptions)
- [LoggerOptions](../wiki/LoggerOptions)
- [LoggerWriteOptions](../wiki/LoggerWriteOptions)
- [SucroseLoggerOptions](../wiki/SucroseLoggerOptions)
- [SucroseOptions](../wiki/SucroseOptions)

### Type Aliases

- [BaseParams](../wiki/Exports#baseparams)
- [ChatInputOption](../wiki/Exports#chatinputoption)
- [ChatInputOptionData](../wiki/Exports#chatinputoptiondata)
- [Code](../wiki/Exports#code)
- [Condition](../wiki/Exports#condition)
- [ContentReturn](../wiki/Exports#contentreturn)
- [Contents](../wiki/Exports#contents)
- [Cooldown](../wiki/Exports#cooldown)
- [CooldownValue](../wiki/Exports#cooldownvalue)
- [DirectoryValue](../wiki/Exports#directoryvalue)
- [EventNames](../wiki/Exports#eventnames)
- [Interaction](../wiki/Exports#interaction)
- [InteractionCommand](../wiki/Exports#interactioncommand)
- [InteractionCommandData](../wiki/Exports#interactioncommanddata)
- [InteractionData](../wiki/Exports#interactiondata)
- [InteractionManagerContents](../wiki/Exports#interactionmanagercontents)
- [LoggerLogFormat](../wiki/Exports#loggerlogformat)
- [Permission](../wiki/Exports#permission)
- [Return](../wiki/Exports#return)
- [SelectMenuComponent](../wiki/Exports#selectmenucomponent)
- [SelectMenuInteraction](../wiki/Exports#selectmenuinteraction)

## Type Aliases

### BaseParams

Ƭ **BaseParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sucrose` | [`Sucrose`](../wiki/Sucrose) |

#### Defined in

[typings/index.d.ts:1723](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1723)

___

### ChatInputOption

Ƭ **ChatInputOption**: [`ChatInputSubGroupOption`](../wiki/ChatInputSubGroupOption) \| [`ChatInputSubOption`](../wiki/ChatInputSubOption)

#### Defined in

[typings/index.d.ts:1728](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1728)

___

### ChatInputOptionData

Ƭ **ChatInputOptionData**: [`ChatInputSubGroupOptionData`](../wiki/ChatInputSubGroupOptionData) \| [`ChatInputSubOptionData`](../wiki/ChatInputSubOptionData)

#### Defined in

[typings/index.d.ts:1733](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1733)

___

### Code

Ƭ **Code**: keyof typeof [`Codes`](../wiki/Codes)

#### Defined in

[typings/index.d.ts:1948](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1948)

___

### Condition

Ƭ **Condition**<`P`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | { `[key: string]`: `any`;  } |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callback` | (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `Discord.Awaitable`<`boolean`\> |
| `disabled?` | `boolean` |
| `label?` | `string` |

#### Defined in

[typings/index.d.ts:1738](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1738)

___

### ContentReturn

Ƭ **ContentReturn**: `Discord.Awaitable`<`Discord.InteractionReplyOptions` \| `Discord.MessageReplyOptions`\>

#### Defined in

[typings/index.d.ts:1755](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1755)

___

### Contents

Ƭ **Contents**: [`InteractionContents`](../wiki/InteractionContents) & [`CooldownContents`](../wiki/CooldownContents) & [`PermissionContents`](../wiki/PermissionContents) & [`ConditionContents`](../wiki/ConditionContents)

#### Defined in

[typings/index.d.ts:1747](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1747)

___

### Cooldown

Ƭ **Cooldown**: { `excluded?`: `string`[] \| `string` ; `included?`: `string`[] \| `string` ; `type`: ``"ROLE"`` \| ``"CHANNEL"`` \| ``"USER"`` \| ``"GUILD"``  } \| { `type`: ``"EVERYONE"`` \| ``"SHARED"`` \| ``"GUILD_MEMBER"`` \| ``"CHANNEL_MEMBER"``  } & { `disabled?`: `boolean` ; `label?`: `string` ; `stack?`: `number` ; `value`: `number`  }

#### Defined in

[typings/index.d.ts:1763](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1763)

___

### CooldownValue

Ƭ **CooldownValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `stack?` | `number` |
| `value` | `number` |

#### Defined in

[typings/index.d.ts:1953](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1953)

___

### DirectoryValue

Ƭ **DirectoryValue**<`S`\>: `S` extends ``true`` ? { `depth`: `number` \| ``null`` ; `path`: `string`  } : { `depth`: `number` \| ``null`` ; `path`: `string`  } \| `string`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `boolean` = ``false`` |

#### Defined in

[typings/index.d.ts:1826](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1826)

___

### EventNames

Ƭ **EventNames**: keyof `Discord.ClientEvents`

#### Defined in

[typings/index.d.ts:1958](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1958)

___

### Interaction

Ƭ **Interaction**: [`Autocomplete`](../wiki/Autocomplete) \| [`Button`](../wiki/Button) \| [`Form`](../wiki/Form) \| [`SelectMenu`](../wiki/SelectMenu)

All interaction

#### Defined in

[typings/index.d.ts:1859](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1859)

___

### InteractionCommand

Ƭ **InteractionCommand**: [`ChatInput`](../wiki/ChatInput) \| [`MessageContextCommand`](../wiki/MessageContextCommand) \| [`UserContextCommand`](../wiki/UserContextCommand)

#### Defined in

[typings/index.d.ts:1833](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1833)

___

### InteractionCommandData

Ƭ **InteractionCommandData**: [`ChatInputData`](../wiki/ChatInputData) \| [`MessageContextCommandData`](../wiki/MessageContextCommandData) \| [`UserContextCommandData`](../wiki/UserContextCommandData)

#### Defined in

[typings/index.d.ts:1838](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1838)

___

### InteractionData

Ƭ **InteractionData**: [`AutocompleteData`](../wiki/AutocompleteData) \| [`ButtonData`](../wiki/ButtonData) \| [`FormData`](../wiki/FormData) \| [`SelectMenuData`](../wiki/SelectMenuData)

All interaction data

#### Defined in

[typings/index.d.ts:1865](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1865)

___

### InteractionManagerContents

Ƭ **InteractionManagerContents**: [`InteractionContents`](../wiki/InteractionContents) & [`PermissionContents`](../wiki/PermissionContents) & [`CooldownContents`](../wiki/CooldownContents) & [`ConditionContents`](../wiki/ConditionContents)

#### Defined in

[typings/index.d.ts:1845](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1845)

___

### LoggerLogFormat

Ƭ **LoggerLogFormat**: ``"rainbow"`` \| keyof `Omit`<[`LoggerLogStyles`](../wiki/LoggerLogStyles), ``"colors"``\> \| \`${keyof typeof LoggerLogStyles["colors"]}\` \| \`${keyof typeof LoggerLogStyles["colors"]}-${"background" \| "font"}\`

#### Defined in

[typings/index.d.ts:1853](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1853)

___

### Permission

Ƭ **Permission**: { `allowed?`: `string`[] \| `string` ; `denied?`: `string`[] \| `string` ; `type`: ``"CHANNEL"`` \| ``"ROLE"`` \| ``"USER"`` \| ``"GUILD"``  } \| { `permissions`: `Discord.PermissionResolvable` ; `type`: ``"SELF"`` \| ``"MEMBER"``  } \| { `type`: ``"PRIVATE_ONLY"`` \| ``"GUILD_ONLY"``  } & { `disabled?`: `boolean` ; `label?`: `string`  }

#### Defined in

[typings/index.d.ts:1883](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1883)

___

### Return

Ƭ **Return**: `any`

#### Defined in

[typings/index.d.ts:1963](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1963)

___

### SelectMenuComponent

Ƭ **SelectMenuComponent**: `Discord.RoleSelectMenuComponent` & { `type`: `Discord.ComponentType.RoleSelect`  } \| `Discord.UserSelectMenuComponent` & { `type`: `Discord.ComponentType.UserSelect`  } \| `Discord.MentionableSelectMenuComponent` & { `type`: `Discord.ComponentType.MentionableSelect`  } \| `Discord.StringSelectMenuComponent` & { `type`: `Discord.ComponentType.StringSelect`  } \| `Discord.ChannelSelectMenuComponent` & { `type`: `Discord.ComponentType.ChannelSelect`  }

All select menu

#### Defined in

[typings/index.d.ts:1871](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1871)

___

### SelectMenuInteraction

Ƭ **SelectMenuInteraction**: `Discord.AnySelectMenuInteraction`

#### Defined in

[typings/index.d.ts:1878](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1878)
