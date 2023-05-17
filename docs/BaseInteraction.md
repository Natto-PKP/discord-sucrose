# Interface: BaseInteraction<P\>

Base of all object (eventModule, Interaction)

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | { `[key: string]`: `any`;  } |

## Hierarchy

- [`GlobalBase`](../wiki/GlobalBase)<`P`\>

  ↳ **`BaseInteraction`**

  ↳↳ [`Autocomplete`](../wiki/Autocomplete)

  ↳↳ [`Button`](../wiki/Button)

  ↳↳ [`ChatInput`](../wiki/ChatInput)

  ↳↳ [`ChatInputSubGroupOption`](../wiki/ChatInputSubGroupOption)

  ↳↳ [`ChatInputSubOption`](../wiki/ChatInputSubOption)

  ↳↳ [`Form`](../wiki/Form)

  ↳↳ [`MessageContextCommand`](../wiki/MessageContextCommand)

  ↳↳ [`SelectMenu`](../wiki/SelectMenu)

  ↳↳ [`UserContextCommand`](../wiki/UserContextCommand)

## Table of contents

### Properties

- [conditions](../wiki/BaseInteraction#conditions)
- [cooldowns](../wiki/BaseInteraction#cooldowns)
- [custom](../wiki/BaseInteraction#custom)
- [description](../wiki/BaseInteraction#description)
- [exec](../wiki/BaseInteraction#exec)
- [hooks](../wiki/BaseInteraction#hooks)
- [permissions](../wiki/BaseInteraction#permissions)
- [tags](../wiki/BaseInteraction#tags)

## Properties

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<`P`\> \| [`Condition`](../wiki/Exports#condition)<`P`\>[]

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

[GlobalBase](../wiki/GlobalBase).[conditions](../wiki/GlobalBase#conditions)

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

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[custom](../wiki/GlobalBase#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[description](../wiki/GlobalBase#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `P` & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[exec](../wiki/GlobalBase#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[hooks](../wiki/GlobalBase#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

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

[GlobalBase](../wiki/GlobalBase).[tags](../wiki/GlobalBase#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
