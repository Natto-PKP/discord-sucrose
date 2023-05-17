# Class: InteractionCommandManager

commands manager

## Hierarchy

- [`BaseInteractionCommandManager`](../wiki/BaseInteractionCommandManager)

  ↳ **`InteractionCommandManager`**

## Table of contents

### Constructors

- [constructor](../wiki/InteractionCommandManager#constructor)

### Properties

- [cache](../wiki/InteractionCommandManager#cache)
- [directory](../wiki/InteractionCommandManager#directory)
- [guilds](../wiki/InteractionCommandManager#guilds)

### Methods

- [add](../wiki/InteractionCommandManager#add)
- [build](../wiki/InteractionCommandManager#build)
- [delete](../wiki/InteractionCommandManager#delete)
- [deploy](../wiki/InteractionCommandManager#deploy)
- [refresh](../wiki/InteractionCommandManager#refresh)
- [restore](../wiki/InteractionCommandManager#restore)
- [undeploy](../wiki/InteractionCommandManager#undeploy)

## Constructors

### constructor

• **new InteractionCommandManager**(`sucrose`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sucrose` | [`Sucrose`](../wiki/Sucrose) |
| `options` | [`InteractionCommandManagerOptions`](../wiki/InteractionCommandManagerOptions) |

#### Overrides

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[constructor](../wiki/BaseInteractionCommandManager#constructor)

#### Defined in

[typings/index.d.ts:370](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L370)

## Properties

### cache

• **cache**: `Collection`<`string`, [`InteractionCommandData`](../wiki/Exports#interactioncommanddata)\>

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[cache](../wiki/BaseInteractionCommandManager#cache)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[directory](../wiki/BaseInteractionCommandManager#directory)

#### Defined in

[typings/index.d.ts:15](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L15)

___

### guilds

• `Readonly` **guilds**: `Collection`<`string`, [`InteractionGuildCommandManager`](../wiki/InteractionGuildCommandManager)\>

[InteractionGuildCommandManager](../wiki/InteractionGuildCommandManager)

#### Defined in

[typings/index.d.ts:368](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L368)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[add](../wiki/BaseInteractionCommandManager#add)

#### Defined in

[typings/index.d.ts:40](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L40)

___

### build

▸ **build**(): `Promise`<`void`\>

load all global command and build potential guild command manager

#### Returns

`Promise`<`void`\>

#### Defined in

[typings/index.d.ts:375](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L375)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[delete](../wiki/BaseInteractionCommandManager#delete)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[deploy](../wiki/BaseInteractionCommandManager#deploy)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[refresh](../wiki/BaseInteractionCommandManager#refresh)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[restore](../wiki/BaseInteractionCommandManager#restore)

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

#### Inherited from

[BaseInteractionCommandManager](../wiki/BaseInteractionCommandManager).[undeploy](../wiki/BaseInteractionCommandManager#undeploy)

#### Defined in

[typings/index.d.ts:62](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L62)
