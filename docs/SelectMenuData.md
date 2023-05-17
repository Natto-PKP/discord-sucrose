# Interface: SelectMenuData

SelectMenuInteraction data

## Hierarchy

- [`SelectMenu`](../wiki/SelectMenu)

  ↳ **`SelectMenuData`**

## Table of contents

### Properties

- [body](../wiki/SelectMenuData#body)
- [conditions](../wiki/SelectMenuData#conditions)
- [cooldowns](../wiki/SelectMenuData#cooldowns)
- [custom](../wiki/SelectMenuData#custom)
- [description](../wiki/SelectMenuData#description)
- [exec](../wiki/SelectMenuData#exec)
- [hooks](../wiki/SelectMenuData#hooks)
- [path](../wiki/SelectMenuData#path)
- [permissions](../wiki/SelectMenuData#permissions)
- [tags](../wiki/SelectMenuData#tags)

## Properties

### body

• **body**: [`SelectMenuComponent`](../wiki/Exports#selectmenucomponent)

Interaction body

#### Inherited from

[SelectMenu](../wiki/SelectMenu).[body](../wiki/SelectMenu#body)

#### Defined in

[typings/index.d.ts:1411](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1411)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  }\>[]

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

[SelectMenu](../wiki/SelectMenu).[conditions](../wiki/SelectMenu#conditions)

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

[SelectMenu](../wiki/SelectMenu).[cooldowns](../wiki/SelectMenu#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[SelectMenu](../wiki/SelectMenu).[custom](../wiki/SelectMenu#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[SelectMenu](../wiki/SelectMenu).[description](../wiki/SelectMenu#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[SelectMenu](../wiki/SelectMenu).[exec](../wiki/SelectMenu#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[SelectMenu](../wiki/SelectMenu).[hooks](../wiki/SelectMenu#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L928)

___

### path

• **path**: `string`

#### Defined in

[typings/index.d.ts:1418](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1418)

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

[SelectMenu](../wiki/SelectMenu).[permissions](../wiki/SelectMenu#permissions)

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

[SelectMenu](../wiki/SelectMenu).[tags](../wiki/SelectMenu#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L951)
