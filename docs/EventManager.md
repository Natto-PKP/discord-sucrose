# Class: EventManager

event manager

## Table of contents

### Constructors

- [constructor](../wiki/EventManager#constructor)

### Properties

- [cache](../wiki/EventManager#cache)

### Methods

- [add](../wiki/EventManager#add)
- [build](../wiki/EventManager#build)
- [listen](../wiki/EventManager#listen)
- [mute](../wiki/EventManager#mute)
- [refresh](../wiki/EventManager#refresh)
- [remove](../wiki/EventManager#remove)

## Constructors

### constructor

• **new EventManager**(`sucrose`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sucrose` | [`Sucrose`](../wiki/Sucrose) |
| `options` | [`EventManagerOptions`](../wiki/EventManagerOptions) |

#### Defined in

[typings/index.d.ts:286](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L286)

## Properties

### cache

• **cache**: `Collection`<keyof `ClientEvents`, [`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

#### Defined in

[typings/index.d.ts:284](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L284)

## Methods

### add

▸ **add**(`name`): `Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

load one or multiple events

**`Example`**

```js
await events.create("ready");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof `ClientEvents` |

#### Returns

`Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

#### Defined in

[typings/index.d.ts:300](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L300)

___

### build

▸ **build**(): `Promise`<`void`\>

load and build each event

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:291](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L291)

___

### listen

▸ **listen**(`name`): `Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

active one or multiple events

**`Example`**

```js
await events.listen("ready");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof `ClientEvents` |

#### Returns

`Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

#### Defined in

[typings/index.d.ts:309](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L309)

___

### mute

▸ **mute**(`name`): `Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

desactive one or multiple events

**`Example`**

```js
await events.mute("ready");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof `ClientEvents` |

#### Returns

`Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

#### Defined in

[typings/index.d.ts:318](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L318)

___

### refresh

▸ **refresh**(`name`): `Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

refresh one or multiple events (remove() and add())

**`Example`**

```js
await events.refresh("ready");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof `ClientEvents` |

#### Returns

`Promise`<[`Event`](../wiki/Event)<keyof `ClientEvents`\>\>

#### Defined in

[typings/index.d.ts:327](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L327)

___

### remove

▸ **remove**(`name`): `void`

remove one or multiple events

**`Example`**

```js
await events.remove("ready");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | keyof `ClientEvents` |

#### Returns

`void`

#### Defined in

[typings/index.d.ts:338](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L338)
