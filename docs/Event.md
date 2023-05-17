# Class: Event<E\>

Structure for manager our event

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`EventNames`](../wiki/Exports#eventnames) = [`EventNames`](../wiki/Exports#eventnames) |

## Table of contents

### Constructors

- [constructor](../wiki/Event#constructor)

### Properties

- [directory](../wiki/Event#directory)
- [disabled](../wiki/Event#disabled)
- [manager](../wiki/Event#manager)
- [modules](../wiki/Event#modules)
- [name](../wiki/Event#name)

### Methods

- [listen](../wiki/Event#listen)
- [mute](../wiki/Event#mute)
- [refresh](../wiki/Event#refresh)
- [remove](../wiki/Event#remove)

## Constructors

### constructor

• **new Event**<`E`\>(`name`, `options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `ClientEvents` = keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `E` |
| `options` | [`EventOptions`](../wiki/EventOptions) |

#### Defined in

[typings/index.d.ts:239](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L239)

## Properties

### directory

• **directory**: `Object`

Path to event folder

#### Type declaration

| Name | Type |
| :------ | :------ |
| `depth` | ``null`` \| `number` |
| `path` | `string` |

#### Defined in

[typings/index.d.ts:237](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L237)

___

### disabled

• **disabled**: `boolean` = `false`

determines whether the event is running or not

**`Default Value`**

`false`

#### Defined in

[typings/index.d.ts:220](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L220)

___

### manager

• `Readonly` **manager**: [`EventManager`](../wiki/EventManager)

redirects to the event manager

[EventManager](../wiki/EventManager)

#### Defined in

[typings/index.d.ts:227](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L227)

___

### modules

• **modules**: `Collection`<`string`, `any`\>

Each event modules represent a file in the event folder

#### Defined in

[typings/index.d.ts:232](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L232)

___

### name

• `Readonly` **name**: `E`

#### Defined in

[typings/index.d.ts:239](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L239)

## Methods

### listen

▸ **listen**(): `Promise`<[`Event`](../wiki/Event)<`E`\>\>

active this event - search et load event handler in your files and run event listener

**`Example`**

```js
await event.listen();
```

#### Returns

`Promise`<[`Event`](../wiki/Event)<`E`\>\>

#### Defined in

[typings/index.d.ts:248](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L248)

___

### mute

▸ **mute**(): `Promise`<[`Event`](../wiki/Event)<`E`\>\>

disable this event

**`Example`**

```js
await event.mute();
```

#### Returns

`Promise`<[`Event`](../wiki/Event)<`E`\>\>

#### Defined in

[typings/index.d.ts:257](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L257)

___

### refresh

▸ **refresh**(): `Promise`<[`Event`](../wiki/Event)<`E`\>\>

refresh this event - mute and listen event

**`Example`**

```js
await event.refresh();
```

#### Returns

`Promise`<[`Event`](../wiki/Event)<`E`\>\>

#### Defined in

[typings/index.d.ts:266](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L266)

___

### remove

▸ **remove**(): `Promise`<`void`\>

remove/delete this event - destroy this event

**`Example`**

```js
await event.remove();
```

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:275](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L275)
