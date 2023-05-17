# Interface: ChatInputSubGroupOptionData

ChatInputSubGroupOption data

## Hierarchy

- [`ChatInputSubGroupOption`](../wiki/ChatInputSubGroupOption)

  ↳ **`ChatInputSubGroupOptionData`**

## Table of contents

### Properties

- [body](../wiki/ChatInputSubGroupOptionData#body)
- [conditions](../wiki/ChatInputSubGroupOptionData#conditions)
- [cooldowns](../wiki/ChatInputSubGroupOptionData#cooldowns)
- [custom](../wiki/ChatInputSubGroupOptionData#custom)
- [description](../wiki/ChatInputSubGroupOptionData#description)
- [exec](../wiki/ChatInputSubGroupOptionData#exec)
- [hooks](../wiki/ChatInputSubGroupOptionData#hooks)
- [options](../wiki/ChatInputSubGroupOptionData#options)
- [path](../wiki/ChatInputSubGroupOptionData#path)
- [permissions](../wiki/ChatInputSubGroupOptionData#permissions)
- [tags](../wiki/ChatInputSubGroupOptionData#tags)

## Properties

### body

• **body**: `ApplicationCommandSubGroupData`

Interaction body

#### Inherited from

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[body](../wiki/ChatInputSubGroupOption#body)

#### Defined in

[typings/index.d.ts:807](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L807)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\> \| [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\>[]

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

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[conditions](../wiki/ChatInputSubGroupOption#conditions)

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

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[cooldowns](../wiki/ChatInputSubGroupOption#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[custom](../wiki/ChatInputSubGroupOption#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[description](../wiki/ChatInputSubGroupOption#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `[key: string]`: `any`;  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `[key: string]`: `any`;  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[exec](../wiki/ChatInputSubGroupOption#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `[key: string]`: `any`;  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `[key: string]`: `any`;  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[hooks](../wiki/ChatInputSubGroupOption#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

___

### options

• **options**: `Collection`<`string`, [`ChatInputSubOptionData`](../wiki/ChatInputSubOptionData)\>

#### Defined in

[typings/index.d.ts:816](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L816)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:815](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L815)

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

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[permissions](../wiki/ChatInputSubGroupOption#permissions)

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

[ChatInputSubGroupOption](../wiki/ChatInputSubGroupOption).[tags](../wiki/ChatInputSubGroupOption#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
