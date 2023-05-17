# Interface: InteractionDirectories<P, S\>

Interaction directories

## Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` = ``false`` |
| `S` | extends `boolean` = ``false`` |

## Table of contents

### Properties

- [autocompletes](../wiki/InteractionDirectories#autocompletes)
- [buttons](../wiki/InteractionDirectories#buttons)
- [commands](../wiki/InteractionDirectories#commands)
- [forms](../wiki/InteractionDirectories#forms)
- [selectMenus](../wiki/InteractionDirectories#selectmenus)

## Properties

### autocompletes

• **autocompletes**: [`DirectoryValue`](../wiki/Exports#directoryvalue)<`S`\>

Directory for autocompletes manager

**`Default Value`**

'interactions/autocompletes'

#### Defined in

[typings/index.d.ts:1202](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1202)

___

### buttons

• **buttons**: [`DirectoryValue`](../wiki/Exports#directoryvalue)<`S`\>

Directory for buttons manager

**`Default Value`**

'interactions/buttons'

#### Defined in

[typings/index.d.ts:1208](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1208)

___

### commands

• **commands**: `P` extends ``true`` ? `Partial`<[`CommandDirectories`](../wiki/CommandDirectories)<`S`\>\> : [`CommandDirectories`](../wiki/CommandDirectories)<`S`\>

Directory for commands manager

#### Defined in

[typings/index.d.ts:1225](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1225)

___

### forms

• **forms**: [`DirectoryValue`](../wiki/Exports#directoryvalue)<`S`\>

Directory for forms manager

**`Default Value`**

'interactions/forms'

#### Defined in

[typings/index.d.ts:1214](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1214)

___

### selectMenus

• **selectMenus**: [`DirectoryValue`](../wiki/Exports#directoryvalue)<`S`\>

Directory for selectMenus manager

**`Default Value`**

'interactions/select-menus'

#### Defined in

[typings/index.d.ts:1220](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1220)
