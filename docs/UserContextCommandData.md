# Interface: UserContextCommandData

UserContextCommand data

## Hierarchy

- [`UserContextCommand`](../wiki/UserContextCommand)

  ↳ **`UserContextCommandData`**

## Table of contents

### Properties

- [body](../wiki/UserContextCommandData#body)
- [conditions](../wiki/UserContextCommandData#conditions)
- [cooldowns](../wiki/UserContextCommandData#cooldowns)
- [custom](../wiki/UserContextCommandData#custom)
- [description](../wiki/UserContextCommandData#description)
- [exec](../wiki/UserContextCommandData#exec)
- [hooks](../wiki/UserContextCommandData#hooks)
- [path](../wiki/UserContextCommandData#path)
- [permissions](../wiki/UserContextCommandData#permissions)
- [tags](../wiki/UserContextCommandData#tags)

## Properties

### body

• **body**: `UserApplicationCommandData`

Interaction body

#### Inherited from

[UserContextCommand](../wiki/UserContextCommand).[body](../wiki/UserContextCommand#body)

#### Defined in

[typings/index.d.ts:1457](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1457)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  }\>[]

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

[UserContextCommand](../wiki/UserContextCommand).[conditions](../wiki/UserContextCommand#conditions)

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

[UserContextCommand](../wiki/UserContextCommand).[cooldowns](../wiki/UserContextCommand#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[UserContextCommand](../wiki/UserContextCommand).[custom](../wiki/UserContextCommand#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[UserContextCommand](../wiki/UserContextCommand).[description](../wiki/UserContextCommand#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[UserContextCommand](../wiki/UserContextCommand).[exec](../wiki/UserContextCommand#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[UserContextCommand](../wiki/UserContextCommand).[hooks](../wiki/UserContextCommand#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:1464](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1464)

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

[UserContextCommand](../wiki/UserContextCommand).[permissions](../wiki/UserContextCommand#permissions)

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

[UserContextCommand](../wiki/UserContextCommand).[tags](../wiki/UserContextCommand#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
