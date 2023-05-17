# Interface: Directories<P, S\>

Configure directories for interactions manager

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` = ``false`` |
| `S` | extends `boolean` = ``false`` |

## Table of contents

### Properties

- [events](../wiki/Directories#events)
- [interactions](../wiki/Directories#interactions)

## Properties

### events

• **events**: [`DirectoryValue`](../wiki/Exports#directoryvalue)<`S`\>

Configure directory for events manager

**`Default Value`**

'events'

#### Defined in

[typings/index.d.ts:979](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L979)

___

### interactions

• **interactions**: `P` extends ``true`` ? `Partial`<[`InteractionDirectories`](../wiki/InteractionDirectories)<`P`, `S`\>\> : [`InteractionDirectories`](../wiki/InteractionDirectories)<`P`, `S`\>

Configure directories form interactions manager

#### Defined in

[typings/index.d.ts:984](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L984)
