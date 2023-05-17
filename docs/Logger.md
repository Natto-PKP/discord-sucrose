# Class: Logger

## Table of contents

### Constructors

- [constructor](../wiki/Logger#constructor)

### Properties

- [console](../wiki/Logger#console)
- [directory](../wiki/Logger#directory)

### Methods

- [error](../wiki/Logger#error)
- [give](../wiki/Logger#give)
- [table](../wiki/Logger#table)
- [write](../wiki/Logger#write)
- [handle](../wiki/Logger#handle)
- [style](../wiki/Logger#style)
- [time](../wiki/Logger#time)

## Constructors

### constructor

• **new Logger**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LoggerOptions`](../wiki/LoggerOptions) |

#### Defined in

[typings/index.d.ts:453](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L453)

## Properties

### console

• **console**: `Console`

Logger console

#### Defined in

[typings/index.d.ts:445](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L445)

___

### directory

• **directory**: ``null`` \| `Console`

Logs directory

**`Default Value`**

`null`

#### Defined in

[typings/index.d.ts:451](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L451)

## Methods

### error

▸ **error**(`code`, `content`, `options?`): `void`

write a error in consoles

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | ``"FATAL"`` \| ``"ERROR"`` \| ``"WARN"`` \| ``"INFO"`` \| ``"SUCCESS"`` |
| `content` | `string` \| `Error` |
| `options?` | [`LoggerErrorOptions`](../wiki/LoggerErrorOptions) |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:485](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L485)

___

### give

▸ **give**(`code`, `content`): `void`

give a code with content message to write

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | ``"FATAL"`` \| ``"ERROR"`` \| ``"WARN"`` \| ``"INFO"`` \| ``"SUCCESS"`` |
| `content` | `string` \| `Error` |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:492](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L492)

___

### table

▸ **table**(`content`): `void`

write a table in consoles

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `object` \| `unknown`[] |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:498](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L498)

___

### write

▸ **write**(`message`, `options?`): `void`

write a message in consoles

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `options?` | [`LoggerWriteOptions`](../wiki/LoggerWriteOptions) |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:505](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L505)

___

### handle

▸ `Static` **handle**(`...errors`): `void`

Handle multiple errors

#### Parameters

| Name | Type |
| :------ | :------ |
| `...errors` | `Error`[] |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:459](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L459)

___

### style

▸ `Static` **style**(`str`, `...formats`): `any`

add some style to ur log

**`Example`**

```js
const text = logger.style("i love ferret", 'rainbow');
console.log(text);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text |
| `...formats` | `string`[] | styles to add |

#### Returns

`any`

#### Defined in

[typings/index.d.ts:471](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L471)

___

### time

▸ `Static` **time**(`format?`): `string` \| `Date`

get current date formatted

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `format` | `boolean` | `true` | convert date to string |

#### Returns

`string` \| `Date`

#### Defined in

[typings/index.d.ts:477](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L477)
