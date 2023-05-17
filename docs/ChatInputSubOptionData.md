# Interface: ChatInputSubOptionData

ChatInputSubOption data

## Hierarchy

- [`ChatInputSubOption`](../wiki/ChatInputSubOption)

  ↳ **`ChatInputSubOptionData`**

## Table of contents

### Properties

- [body](../wiki/ChatInputSubOptionData#body)
- [conditions](../wiki/ChatInputSubOptionData#conditions)
- [cooldowns](../wiki/ChatInputSubOptionData#cooldowns)
- [custom](../wiki/ChatInputSubOptionData#custom)
- [description](../wiki/ChatInputSubOptionData#description)
- [exec](../wiki/ChatInputSubOptionData#exec)
- [hooks](../wiki/ChatInputSubOptionData#hooks)
- [path](../wiki/ChatInputSubOptionData#path)
- [permissions](../wiki/ChatInputSubOptionData#permissions)
- [tags](../wiki/ChatInputSubOptionData#tags)

## Properties

### body

• **body**: `ApplicationCommandSubCommandData`

interaction body

#### Inherited from

[ChatInputSubOption](../wiki/ChatInputSubOption).[body](../wiki/ChatInputSubOption#body)

#### Defined in

[typings/index.d.ts:852](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L852)

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

[ChatInputSubOption](../wiki/ChatInputSubOption).[conditions](../wiki/ChatInputSubOption#conditions)

#### Defined in

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L913)

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

[ChatInputSubOption](../wiki/ChatInputSubOption).[cooldowns](../wiki/ChatInputSubOption#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[ChatInputSubOption](../wiki/ChatInputSubOption).[custom](../wiki/ChatInputSubOption#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[ChatInputSubOption](../wiki/ChatInputSubOption).[description](../wiki/ChatInputSubOption#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L923)

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

[ChatInputSubOption](../wiki/ChatInputSubOption).[exec](../wiki/ChatInputSubOption#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L957)

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

[ChatInputSubOption](../wiki/ChatInputSubOption).[hooks](../wiki/ChatInputSubOption#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L928)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:859](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L859)

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

[ChatInputSubOption](../wiki/ChatInputSubOption).[permissions](../wiki/ChatInputSubOption#permissions)

#### Defined in

[typings/index.d.ts:691](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L691)

___

### tags

• `Optional` **tags**: `string`[]

customize with some tags

**`Example`**

```js
["moderation", "admin", "management"]
```

#### Inherited from

[ChatInputSubOption](../wiki/ChatInputSubOption).[tags](../wiki/ChatInputSubOption#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L951)
