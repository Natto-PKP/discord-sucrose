# Interface: CooldownContents

Cooldown contents

## Table of contents

### Properties

- [COOLDOWN\_HIT](../wiki/CooldownContents#cooldown_hit)

## Properties

### COOLDOWN\_HIT

• **COOLDOWN\_HIT**: (`params`: { `cooldown`: [`Cooldown`](../wiki/Exports#cooldown) ; `interaction?`: `Interaction`<`CacheType`\> ; `key`: `string` ; `message?`: `Message`<`boolean`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when an user hit an interaction cooldown

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.cooldown` | [`Cooldown`](../wiki/Exports#cooldown) |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.key` | `string` |
| `params.message?` | `Message`<`boolean`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1633](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1633)
