# Interface: EventModule<E\>

EventModule

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`EventNames`](../wiki/Exports#eventnames) |

## Hierarchy

- [`GlobalBase`](../wiki/GlobalBase)<{ `args`: `Discord.ClientEvents`[`E`]  }\>

  ↳ **`EventModule`**

## Table of contents

### Properties

- [conditions](../wiki/EventModule#conditions)
- [custom](../wiki/EventModule#custom)
- [description](../wiki/EventModule#description)
- [disabled](../wiki/EventModule#disabled)
- [exec](../wiki/EventModule#exec)
- [hooks](../wiki/EventModule#hooks)
- [label](../wiki/EventModule#label)
- [tags](../wiki/EventModule#tags)

## Properties

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `args`: `ClientEvents`[`E`]  }\> \| [`Condition`](../wiki/Exports#condition)<{ `args`: `ClientEvents`[`E`]  }\>[]

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

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L913)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[custom](../wiki/GlobalBase#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[description](../wiki/GlobalBase#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L923)

___

### disabled

• `Optional` **disabled**: `boolean`

disable or not this module

#### Defined in

[typings/index.d.ts:1028](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1028)

___

### exec

• `Optional` **exec**: (`params`: { `args`: `ClientEvents`[`E`]  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `args`: `ClientEvents`[`E`]  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[exec](../wiki/GlobalBase#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `args`: `ClientEvents`[`E`]  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `args`: `ClientEvents`[`E`]  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[GlobalBase](../wiki/GlobalBase).[hooks](../wiki/GlobalBase#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L928)

___

### label

• **label**: `string`

name of this module

#### Defined in

[typings/index.d.ts:1033](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1033)

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

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L951)
