# Class: CooldownManager

Manage interactions and command cooldown

**`Remarks`**

By default sucrose cooldown use discord collection, but you can override this service with your

**`Example`**

```js
const cache = redis;
const cooldown = new CooldownService(cache);
sucrose.cooldown = cooldown;
```

**`Example`**

```js
const cooldown = new CooldownService(redis);
new Sucrose({ cooldown });
```

## Hierarchy

- [`BaseCooldownManager`](../wiki/BaseCooldownManager)

  ↳ **`CooldownManager`**

## Table of contents

### Constructors

- [constructor](../wiki/CooldownManager#constructor)

### Properties

- [cache](../wiki/CooldownManager#cache)

### Methods

- [isOver](../wiki/CooldownManager#isover)

## Constructors

### constructor

• **new CooldownManager**()

#### Inherited from

[BaseCooldownManager](../wiki/BaseCooldownManager).[constructor](../wiki/BaseCooldownManager#constructor)

## Properties

### cache

• **cache**: `Collection`<`string`, [`CooldownValue`](../wiki/Exports#cooldownvalue)\>

Cooldown cache

**`Default Value`**

`Discord.Collection<string, number>`

#### Inherited from

[BaseCooldownManager](../wiki/BaseCooldownManager).[cache](../wiki/BaseCooldownManager#cache)

#### Defined in

[typings/index.d.ts:145](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L145)

## Methods

### isOver

▸ **isOver**(`params`): `Promise`<`void`\>

Check if the cooldown is over or not, its not recommended to override this

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.cooldowns` | [`Cooldown`](../wiki/Exports#cooldown) \| [`Cooldown`](../wiki/Exports#cooldown)[] |
| `params.id` | `string` |
| `params.interaction` | `Interaction`<`CacheType`\> |

#### Returns

`Promise`<`void`\>

#### Overrides

[BaseCooldownManager](../wiki/BaseCooldownManager).[isOver](../wiki/BaseCooldownManager#isover)

#### Defined in

[typings/index.d.ts:203](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L203)
