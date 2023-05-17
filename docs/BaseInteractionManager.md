# Class: BaseInteractionManager<T\>

Base structure for basic discord.js interaction

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`InteractionData`](../wiki/Exports#interactiondata) = `Types.InteractionData` |

## Table of contents

### Constructors

- [constructor](../wiki/BaseInteractionManager#constructor)

### Properties

- [cache](../wiki/BaseInteractionManager#cache)
- [directory](../wiki/BaseInteractionManager#directory)

### Methods

- [add](../wiki/BaseInteractionManager#add)
- [build](../wiki/BaseInteractionManager#build)
- [refresh](../wiki/BaseInteractionManager#refresh)

## Constructors

### constructor

• **new BaseInteractionManager**<`T`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`InteractionData`](../wiki/Exports#interactiondata) = `InteractionData` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Defined in

[typings/index.d.ts:111](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L111)

## Properties

### cache

• **cache**: `Collection`<`string`, `T`\>

#### Defined in

[typings/index.d.ts:104](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L104)

___

### directory

• **directory**: `Object`

interactions directory

#### Type declaration

| Name | Type |
| :------ | :------ |
| `depth` | ``null`` \| `number` |
| `path` | `string` |

#### Defined in

[typings/index.d.ts:109](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L109)

## Methods

### add

▸ **add**(`interaction`): `void`

Add interaction

#### Parameters

| Name | Type |
| :------ | :------ |
| `interaction` | `T` |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:121](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L121)

___

### build

▸ **build**(): `Promise`<`void`\>

Build interaction manager

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:116](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L116)

___

### refresh

▸ **refresh**(`name`): `Promise`<[`BaseInteractionManager`](../wiki/BaseInteractionManager)<`T`\>\>

Delete and set an existing interaction

**`Example`**

```js
await manager.refresh('interaction-name');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `any` | interaction customId |

#### Returns

`Promise`<[`BaseInteractionManager`](../wiki/BaseInteractionManager)<`T`\>\>

#### Defined in

[typings/index.d.ts:132](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L132)
