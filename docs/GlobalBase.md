# Interface: GlobalBase<P\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | { `[key: string]`: `any`;  } |

## Hierarchy

- **`GlobalBase`**

  ↳ [`BaseInteraction`](../wiki/BaseInteraction)

  ↳ [`EventModule`](../wiki/EventModule)

## Table of contents

### Properties

- [conditions](../wiki/GlobalBase#conditions)
- [custom](../wiki/GlobalBase#custom)
- [description](../wiki/GlobalBase#description)
- [exec](../wiki/GlobalBase#exec)
- [hooks](../wiki/GlobalBase#hooks)
- [tags](../wiki/GlobalBase#tags)

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

#### Defined in

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L913)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L923)

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

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: `P` & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L928)

___

### tags

• `Optional` **tags**: `string`[]

customize with some tags

**`Example`**

```js
["moderation", "admin", "management"]
```

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L951)
