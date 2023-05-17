# Class: PermissionManager

## Table of contents

### Constructors

- [constructor](../wiki/PermissionManager#constructor)

### Properties

- [contents](../wiki/PermissionManager#contents)

### Methods

- [isAuthorized](../wiki/PermissionManager#isauthorized)

## Constructors

### constructor

• **new PermissionManager**(`contents`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | [`PermissionContents`](../wiki/PermissionContents) |

#### Defined in

[typings/index.d.ts:515](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L515)

## Properties

### contents

• **contents**: [`PermissionContents`](../wiki/PermissionContents)

#### Defined in

[typings/index.d.ts:513](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L513)

## Methods

### isAuthorized

▸ **isAuthorized**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permissions` | [`Permission`](../wiki/Exports#permission) \| [`Permission`](../wiki/Exports#permission)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:517](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L517)
