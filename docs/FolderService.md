# Class: FolderService

folder service

## Table of contents

### Constructors

- [constructor](../wiki/FolderService#constructor)

### Methods

- [load](../wiki/FolderService#load)
- [search](../wiki/FolderService#search)

## Constructors

### constructor

• **new FolderService**()

## Methods

### load

▸ `Static` **load**(`path`, `prop?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `prop?` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[typings/index.d.ts:356](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L356)

___

### search

▸ `Static` **search**(`options`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.autoExcludeFileOnRecursive?` | `boolean` |
| `options.depth?` | `boolean` |
| `options.fileNameOnly?` | `boolean` |
| `options.filter` | `Object` |
| `options.filter.ext` | `string` |
| `options.filter.type` | ``"folder"`` \| ``"file"`` |
| `options.nameOnly?` | `boolean` |
| `options.path` | `string` |

#### Returns

`string`[]

#### Defined in

[typings/index.d.ts:347](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L347)
