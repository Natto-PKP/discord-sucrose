# Interface: SucroseOptions<P, S\>

Sucrose options

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` = ``false`` |
| `S` | extends `boolean` = ``false`` |

## Hierarchy

- `ClientOptions`

- `Partial`<[`GlobalOptions`](../wiki/GlobalOptions)<`P`\>\>

  ↳ **`SucroseOptions`**

## Table of contents

### Properties

- [allowedMentions](../wiki/SucroseOptions#allowedmentions)
- [closeTimeout](../wiki/SucroseOptions#closetimeout)
- [contents](../wiki/SucroseOptions#contents)
- [cooldown](../wiki/SucroseOptions#cooldown)
- [directories](../wiki/SucroseOptions#directories)
- [env](../wiki/SucroseOptions#env)
- [failIfNotExists](../wiki/SucroseOptions#failifnotexists)
- [features](../wiki/SucroseOptions#features)
- [intents](../wiki/SucroseOptions#intents)
- [jsonTransformer](../wiki/SucroseOptions#jsontransformer)
- [logging](../wiki/SucroseOptions#logging)
- [makeCache](../wiki/SucroseOptions#makecache)
- [partials](../wiki/SucroseOptions#partials)
- [presence](../wiki/SucroseOptions#presence)
- [rest](../wiki/SucroseOptions#rest)
- [shardCount](../wiki/SucroseOptions#shardcount)
- [shards](../wiki/SucroseOptions#shards)
- [sweepers](../wiki/SucroseOptions#sweepers)
- [token](../wiki/SucroseOptions#token)
- [waitGuildTimeout](../wiki/SucroseOptions#waitguildtimeout)
- [ws](../wiki/SucroseOptions#ws)

## Properties

### allowedMentions

• `Optional` **allowedMentions**: `MessageMentionOptions`

#### Inherited from

Discord.ClientOptions.allowedMentions

#### Defined in

node_modules/discord.js/typings/index.d.ts:4830

___

### closeTimeout

• `Optional` **closeTimeout**: `number`

#### Inherited from

Discord.ClientOptions.closeTimeout

#### Defined in

node_modules/discord.js/typings/index.d.ts:4828

___

### contents

• `Optional` **contents**: `P` extends ``true`` ? `Partial`<[`Contents`](../wiki/Exports#contents)\> : [`Contents`](../wiki/Exports#contents)

#### Defined in

[typings/index.d.ts:1474](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1474)

___

### cooldown

• `Optional` **cooldown**: `any`

#### Defined in

[typings/index.d.ts:1473](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1473)

___

### directories

• `Optional` **directories**: `P` extends ``true`` ? `Partial`<[`Directories`](../wiki/Directories)<``true``, `S`\>\> : [`Directories`](../wiki/Directories)<``false``, `S`\>

#### Defined in

[typings/index.d.ts:1475](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1475)

___

### env

• `Optional` **env**: `P` extends ``true`` ? `Partial`<[`EnvironmentOptions`](../wiki/EnvironmentOptions)\> : [`EnvironmentOptions`](../wiki/EnvironmentOptions)

#### Defined in

[typings/index.d.ts:1476](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1476)

___

### failIfNotExists

• `Optional` **failIfNotExists**: `boolean`

#### Inherited from

Discord.ClientOptions.failIfNotExists

#### Defined in

node_modules/discord.js/typings/index.d.ts:4832

___

### features

• `Optional` **features**: `P` extends ``true`` ? `Partial`<[`Features`](../wiki/Features)<``true``\>\> : [`Features`](../wiki/Features)<``false``\>

#### Defined in

[typings/index.d.ts:1477](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1477)

___

### intents

• **intents**: `BitFieldResolvable`<``"Guilds"`` \| ``"GuildMembers"`` \| ``"GuildModeration"`` \| ``"GuildBans"`` \| ``"GuildEmojisAndStickers"`` \| ``"GuildIntegrations"`` \| ``"GuildWebhooks"`` \| ``"GuildInvites"`` \| ``"GuildVoiceStates"`` \| ``"GuildPresences"`` \| ``"GuildMessages"`` \| ``"GuildMessageReactions"`` \| ``"GuildMessageTyping"`` \| ``"DirectMessages"`` \| ``"DirectMessageReactions"`` \| ``"DirectMessageTyping"`` \| ``"MessageContent"`` \| ``"GuildScheduledEvents"`` \| ``"AutoModerationConfiguration"`` \| ``"AutoModerationExecution"``, `number`\>

#### Inherited from

Discord.ClientOptions.intents

#### Defined in

node_modules/discord.js/typings/index.d.ts:4834

___

### jsonTransformer

• `Optional` **jsonTransformer**: (`obj`: `unknown`) => `unknown`

#### Type declaration

▸ (`obj`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `unknown` |

##### Returns

`unknown`

#### Inherited from

Discord.ClientOptions.jsonTransformer

#### Defined in

node_modules/discord.js/typings/index.d.ts:4839

___

### logging

• `Optional` **logging**: `P` extends ``true`` ? `Partial`<[`SucroseLoggerOptions`](../wiki/SucroseLoggerOptions)\> : [`SucroseLoggerOptions`](../wiki/SucroseLoggerOptions)

#### Inherited from

Partial.logging

#### Defined in

[typings/index.d.ts:1179](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1179)

___

### makeCache

• `Optional` **makeCache**: `CacheFactory`

#### Inherited from

Discord.ClientOptions.makeCache

#### Defined in

node_modules/discord.js/typings/index.d.ts:4829

___

### partials

• `Optional` **partials**: `Partials`[]

#### Inherited from

Discord.ClientOptions.partials

#### Defined in

node_modules/discord.js/typings/index.d.ts:4831

___

### presence

• `Optional` **presence**: `PresenceData`

#### Inherited from

Discord.ClientOptions.presence

#### Defined in

node_modules/discord.js/typings/index.d.ts:4833

___

### rest

• `Optional` **rest**: `Partial`<`RESTOptions`\>

#### Inherited from

Discord.ClientOptions.rest

#### Defined in

node_modules/discord.js/typings/index.d.ts:4838

___

### shardCount

• `Optional` **shardCount**: `number`

#### Inherited from

Discord.ClientOptions.shardCount

#### Defined in

node_modules/discord.js/typings/index.d.ts:4827

___

### shards

• `Optional` **shards**: `number` \| `number`[] \| ``"auto"``

#### Inherited from

Discord.ClientOptions.shards

#### Defined in

node_modules/discord.js/typings/index.d.ts:4826

___

### sweepers

• `Optional` **sweepers**: `SweeperOptions`

#### Inherited from

Discord.ClientOptions.sweepers

#### Defined in

node_modules/discord.js/typings/index.d.ts:4836

___

### token

• `Optional` **token**: `string`

#### Defined in

[typings/index.d.ts:1478](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1478)

___

### waitGuildTimeout

• `Optional` **waitGuildTimeout**: `number`

#### Inherited from

Discord.ClientOptions.waitGuildTimeout

#### Defined in

node_modules/discord.js/typings/index.d.ts:4835

___

### ws

• `Optional` **ws**: `WebSocketOptions`

#### Inherited from

Discord.ClientOptions.ws

#### Defined in

node_modules/discord.js/typings/index.d.ts:4837
