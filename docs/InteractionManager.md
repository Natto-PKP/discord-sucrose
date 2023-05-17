# Class: InteractionManager

Structure for manage all classic interaction

## Table of contents

### Constructors

- [constructor](../wiki/InteractionManager#constructor)

### Properties

- [autocompletes](../wiki/InteractionManager#autocompletes)
- [buttons](../wiki/InteractionManager#buttons)
- [commands](../wiki/InteractionManager#commands)
- [forms](../wiki/InteractionManager#forms)
- [selectMenus](../wiki/InteractionManager#selectmenus)

### Methods

- [build](../wiki/InteractionManager#build)

## Constructors

### constructor

• **new InteractionManager**(`sucrose`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sucrose` | [`Sucrose`](../wiki/Sucrose) |
| `options` | [`BaseInteractionManagerOptions`](../wiki/BaseInteractionManagerOptions) |

#### Defined in

[typings/index.d.ts:429](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L429)

## Properties

### autocompletes

• **autocompletes**: [`BaseInteractionManager`](../wiki/BaseInteractionManager)<[`AutocompleteData`](../wiki/AutocompleteData)\>

autocomplete interaction manager

#### Defined in

[typings/index.d.ts:407](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L407)

___

### buttons

• **buttons**: [`BaseInteractionManager`](../wiki/BaseInteractionManager)<[`ButtonData`](../wiki/ButtonData)\>

buttons interaction manager

#### Defined in

[typings/index.d.ts:412](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L412)

___

### commands

• **commands**: [`InteractionCommandManager`](../wiki/InteractionCommandManager)

commands interaction manager

#### Defined in

[typings/index.d.ts:417](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L417)

___

### forms

• **forms**: [`BaseInteractionManager`](../wiki/BaseInteractionManager)<[`FormData`](../wiki/FormData)\>

form modals interaction manager

#### Defined in

[typings/index.d.ts:422](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L422)

___

### selectMenus

• **selectMenus**: [`BaseInteractionManager`](../wiki/BaseInteractionManager)<[`SelectMenuData`](../wiki/SelectMenuData)\>

select menus interaction manager

#### Defined in

[typings/index.d.ts:427](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L427)

## Methods

### build

▸ **build**(): `Promise`<`void`\>

build this manager and all interaction manager

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:434](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L434)
