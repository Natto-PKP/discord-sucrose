# Class: AsyncUtil

Some utils fonction for async

## Table of contents

### Constructors

- [constructor](../wiki/AsyncUtil#constructor)

### Methods

- [every](../wiki/AsyncUtil#every)
- [some](../wiki/AsyncUtil#some)

## Constructors

### constructor

• **new AsyncUtil**()

## Methods

### every

▸ `Static` **every**<`T`\>(`arr`, `callback`): `Promise`<`boolean`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `callback` | `Callback`<`T`, `boolean`\> |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[typings/index.d.ts:164](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L164)

___

### some

▸ `Static` **some**<`T`\>(`arr`, `callback`): `Promise`<`boolean`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `callback` | `Callback`<`T`, `boolean`\> |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[typings/index.d.ts:165](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L165)
