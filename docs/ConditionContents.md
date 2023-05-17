# Interface: ConditionContents

Condition contents

## Table of contents

### Properties

- [CONDITION\_FAILED](../wiki/ConditionContents#condition_failed)

## Properties

### CONDITION\_FAILED

• **CONDITION\_FAILED**: (`params`: { `conditions`: [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\> \| [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\>[] ; `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

When a custom condition failed

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.conditions` | [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\> \| [`Condition`](../wiki/Exports#condition)<{ `[key: string]`: `any`;  }\>[] |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1617](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1617)
