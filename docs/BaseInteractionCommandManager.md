# Class: BaseInteractionCommandManager

Base structure for command manager

## Hierarchy

- **`BaseInteractionCommandManager`**

  ↳ [`InteractionCommandManager`](../wiki/InteractionCommandManager)

  ↳ [`InteractionGuildCommandManager`](../wiki/InteractionGuildCommandManager)

## Table of contents

### Constructors

- [constructor](../wiki/BaseInteractionCommandManager#constructor)

### Properties

- [cache](../wiki/BaseInteractionCommandManager#cache)
- [directory](../wiki/BaseInteractionCommandManager#directory)

### Methods

- [add](../wiki/BaseInteractionCommandManager#add)
- [delete](../wiki/BaseInteractionCommandManager#delete)
- [deploy](../wiki/BaseInteractionCommandManager#deploy)
- [refresh](../wiki/BaseInteractionCommandManager#refresh)
- [restore](../wiki/BaseInteractionCommandManager#restore)
- [undeploy](../wiki/BaseInteractionCommandManager#undeploy)

## Constructors

### constructor

• **new BaseInteractionCommandManager**(`sucrose`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sucrose` | [`Sucrose`](../wiki/Sucrose) |
| `options` | [`BaseInteractionCommandManagerOptions`](../wiki/BaseInteractionCommandManagerOptions) |

#### Defined in

[typings/index.d.ts:17](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L17)

## Properties

### cache

• **cache**: `Collection`<`string`, [`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

#### Defined in

[typings/index.d.ts:18](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L18)

___

### directory

• **directory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `depth` | ``null`` \| `number` |
| `path` | `string` |

#### Defined in

[typings/index.d.ts:15](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L15)

## Methods

### add

▸ **add**(`command`): `Promise`<[`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

Load and set a new command

**`Example`**

```js
await manager.add({
  body: {
   name: 'say',
   description: 'I will say something',
   type: ApplicationCommandType.ChatInput,
 },

 exec: async ({ interaction }) => {
   const text = interaction.options.getString('text', true);
   await interaction.reply(text);
 },
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | [`InteractionCommandData`](../wiki/Exports#interactioncommanddata) |

#### Returns

`Promise`<[`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

#### Defined in

[typings/index.d.ts:40](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L40)

___

### delete

▸ **delete**(`name`): `boolean`

Delete a existing command from the collection

**`Example`**

```js
manager.delete('avatar');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | command name |

#### Returns

`boolean`

#### Defined in

[typings/index.d.ts:73](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L73)

___

### deploy

▸ **deploy**(`name`): `Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

Send a existing command in Discord API

**`Example`**

```js
await manager.name('avatar');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | command name |

#### Returns

`Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

#### Defined in

[typings/index.d.ts:51](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L51)

___

### refresh

▸ **refresh**(`name`): `Promise`<[`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

Delete and add an existing command

**`Example`**

```js
await manager.refresh('avatar');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | command name |

#### Returns

`Promise`<[`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

#### Defined in

[typings/index.d.ts:84](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L84)

___

### restore

▸ **restore**(`name`): `Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

Remove and define an existing command

**`Example`**

Restore a command
```js
await manager.restore('avatar');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | command name |

#### Returns

`Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

#### Defined in

[typings/index.d.ts:95](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L95)

___

### undeploy

▸ **undeploy**(`name`): `Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

Delete a existing command in Discord API

**`Example`**

```js
await manager.remove('avatar');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | command name |

#### Returns

`Promise`<`undefined` \| ``null`` \| `ApplicationCommand`<{}\>\>

#### Defined in

[typings/index.d.ts:62](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L62)
