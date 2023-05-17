# Interface: MessageContextCommandData

MessageContextCommand data

## Hierarchy

- [`MessageContextCommand`](../wiki/MessageContextCommand)

  ↳ **`MessageContextCommandData`**

## Table of contents

### Properties

- [body](../wiki/MessageContextCommandData#body)
- [conditions](../wiki/MessageContextCommandData#conditions)
- [cooldowns](../wiki/MessageContextCommandData#cooldowns)
- [custom](../wiki/MessageContextCommandData#custom)
- [description](../wiki/MessageContextCommandData#description)
- [exec](../wiki/MessageContextCommandData#exec)
- [hooks](../wiki/MessageContextCommandData#hooks)
- [path](../wiki/MessageContextCommandData#path)
- [permissions](../wiki/MessageContextCommandData#permissions)
- [tags](../wiki/MessageContextCommandData#tags)

## Properties

### body

• **body**: `MessageApplicationCommandData`

Interaction body

#### Inherited from

[MessageContextCommand](../wiki/MessageContextCommand).[body](../wiki/MessageContextCommand#body)

#### Defined in

[typings/index.d.ts:1373](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1373)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  }\>[]

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

[MessageContextCommand](../wiki/MessageContextCommand).[conditions](../wiki/MessageContextCommand#conditions)

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

[MessageContextCommand](../wiki/MessageContextCommand).[cooldowns](../wiki/MessageContextCommand#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[MessageContextCommand](../wiki/MessageContextCommand).[custom](../wiki/MessageContextCommand#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[MessageContextCommand](../wiki/MessageContextCommand).[description](../wiki/MessageContextCommand#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[MessageContextCommand](../wiki/MessageContextCommand).[exec](../wiki/MessageContextCommand#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[MessageContextCommand](../wiki/MessageContextCommand).[hooks](../wiki/MessageContextCommand#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:1380](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1380)

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

[MessageContextCommand](../wiki/MessageContextCommand).[permissions](../wiki/MessageContextCommand#permissions)

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

[MessageContextCommand](../wiki/MessageContextCommand).[tags](../wiki/MessageContextCommand#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
