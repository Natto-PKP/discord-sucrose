# Class: BaseCooldownManager

Base cooldown service

## Hierarchy

- **`BaseCooldownManager`**

  ↳ [`CooldownManager`](../wiki/CooldownManager)

## Table of contents

### Constructors

- [constructor](../wiki/BaseCooldownManager#constructor)

### Properties

- [cache](../wiki/BaseCooldownManager#cache)

### Methods

- [isOver](../wiki/BaseCooldownManager#isover)

## Constructors

### constructor

• **new BaseCooldownManager**()

## Properties

### cache

• **cache**: `Collection`<`string`, [`CooldownValue`](../wiki/Exports#cooldownvalue)\>

Cooldown cache

**`Default Value`**

`Discord.Collection<string, number>`

#### Defined in

[typings/index.d.ts:145](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L145)

## Methods

### isOver

▸ **isOver**(`params`): `any`

DO NOT OVERRIDE THIS

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.cooldowns` | `any` |
| `params.id` | `string` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |

#### Returns

`any`

#### Defined in

[typings/index.d.ts:150](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L150)
