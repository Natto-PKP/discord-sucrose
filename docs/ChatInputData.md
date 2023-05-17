# Interface: ChatInputData

ChatInputInteraction data

## Hierarchy

- [`ChatInput`](../wiki/ChatInput)

  ↳ **`ChatInputData`**

## Table of contents

### Properties

- [body](../wiki/ChatInputData#body)
- [conditions](../wiki/ChatInputData#conditions)
- [cooldowns](../wiki/ChatInputData#cooldowns)
- [custom](../wiki/ChatInputData#custom)
- [description](../wiki/ChatInputData#description)
- [exec](../wiki/ChatInputData#exec)
- [hooks](../wiki/ChatInputData#hooks)
- [options](../wiki/ChatInputData#options)
- [path](../wiki/ChatInputData#path)
- [permissions](../wiki/ChatInputData#permissions)
- [tags](../wiki/ChatInputData#tags)

## Properties

### body

• **body**: `ChatInputApplicationCommandData`

Interaction chat input body

#### Inherited from

[ChatInput](../wiki/ChatInput).[body](../wiki/ChatInput#body)

#### Defined in

[typings/index.d.ts:774](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L774)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  }\>[]

Manage custom conditions

**`Remarks`**

It's used for custom conditions,
you must manage the reply because is not handled by Sucrose.
You can do these example with just Permission

**`Example`**

```js
{ callback: ({ interaction }) => interaction.guild.id === '713172382042423352' }
```

**`Example`**

```js
[
  { callback: ({ interaction }) => interaction.guild.id === '713172382042423352' },
  { callback: ({ interaction }) => interaction.user.id === '1068866278321831987' },
]
```

#### Inherited from

[ChatInput](../wiki/ChatInput).[conditions](../wiki/ChatInput#conditions)

#### Defined in

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L913)

___

### cooldowns

• `Optional` **cooldowns**: [`Cooldown`](../wiki/Exports#cooldown) \| [`Cooldown`](../wiki/Exports#cooldown)[]

Manage cooldowns

**`Example`**

```js
{
  type: "EVERYONE",
  value: 3 * 1000,
}
```

**`Example`**

```js
[
  {
    type: "ROLE",
    excluded: ["570642674151981135"],
    value: 5 * 1000,
  },
  {
    type: "GUILD_MEMBER",
    value: 1 * 1000,
  },
]
```

#### Inherited from

[ChatInput](../wiki/ChatInput).[cooldowns](../wiki/ChatInput#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[ChatInput](../wiki/ChatInput).[custom](../wiki/ChatInput#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[ChatInput](../wiki/ChatInput).[description](../wiki/ChatInput#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[ChatInput](../wiki/ChatInput).[exec](../wiki/ChatInput#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[ChatInput](../wiki/ChatInput).[hooks](../wiki/ChatInput#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

___

### options

• **options**: `Collection`<`string`, [`ChatInputSubOptionData`](../wiki/ChatInputSubOptionData) \| [`ChatInputSubGroupOptionData`](../wiki/ChatInputSubGroupOptionData)\>

#### Defined in

[typings/index.d.ts:783](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L783)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:782](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L782)

___

### permissions

• `Optional` **permissions**: [`Permission`](../wiki/Exports#permission) \| [`Permission`](../wiki/Exports#permission)[]

Manage interaction required permissions

**`Example`**

```js
{
  type: "MEMBER",
  permissions: ["ADMINISTRATOR"],
}
```

**`Example`**

```js
[
  {
    type: "SELF",
    permissions: ["MANAGE_SERVER"],
  },
  {
    type: "CHANNEL",
    allowed: ["713309212855238707"],
  }
]
```

#### Inherited from

[ChatInput](../wiki/ChatInput).[permissions](../wiki/ChatInput#permissions)

#### Defined in

[typings/index.d.ts:691](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L691)

___

### tags

• `Optional` **tags**: `string`[]

customize with some tags

**`Example`**

```js
["moderation", "admin", "management"]
```

#### Inherited from

[ChatInput](../wiki/ChatInput).[tags](../wiki/ChatInput#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
