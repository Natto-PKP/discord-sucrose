# Interface: InteractionHooks

## Table of contents

### Properties

- [afterAutocompleteExecute](../wiki/InteractionHooks#afterautocompleteexecute)
- [afterButtonExecute](../wiki/InteractionHooks#afterbuttonexecute)
- [afterChatInputExecute](../wiki/InteractionHooks#afterchatinputexecute)
- [afterChatInputOptionExecute](../wiki/InteractionHooks#afterchatinputoptionexecute)
- [afterCommandExecute](../wiki/InteractionHooks#aftercommandexecute)
- [afterFormExecute](../wiki/InteractionHooks#afterformexecute)
- [afterInteractionExecute](../wiki/InteractionHooks#afterinteractionexecute)
- [afterMessageCommandExecute](../wiki/InteractionHooks#aftermessagecommandexecute)
- [afterSelectMenuExecute](../wiki/InteractionHooks#afterselectmenuexecute)
- [afterUserCommandExecute](../wiki/InteractionHooks#afterusercommandexecute)
- [beforeAutocompleteExecute](../wiki/InteractionHooks#beforeautocompleteexecute)
- [beforeButtonExecute](../wiki/InteractionHooks#beforebuttonexecute)
- [beforeChatInputExecute](../wiki/InteractionHooks#beforechatinputexecute)
- [beforeChatInputOptionExecute](../wiki/InteractionHooks#beforechatinputoptionexecute)
- [beforeCommandExecute](../wiki/InteractionHooks#beforecommandexecute)
- [beforeFormExecute](../wiki/InteractionHooks#beforeformexecute)
- [beforeInteractionExecute](../wiki/InteractionHooks#beforeinteractionexecute)
- [beforeMessageCommandExecute](../wiki/InteractionHooks#beforemessagecommandexecute)
- [beforeSelectMenuExecute](../wiki/InteractionHooks#beforeselectmenuexecute)
- [beforeUserCommandExecute](../wiki/InteractionHooks#beforeusercommandexecute)

## Properties

### afterAutocompleteExecute

• `Optional` **afterAutocompleteExecute**: (`params`: { `data`: [`Autocomplete`](../wiki/Autocomplete) ; `interaction`: `AutocompleteInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Autocomplete`](../wiki/Autocomplete) ; `interaction`: `AutocompleteInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1278](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1278)

___

### afterButtonExecute

• `Optional` **afterButtonExecute**: (`params`: { `data`: [`Button`](../wiki/Button) ; `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Button`](../wiki/Button) ; `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1246](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1246)

___

### afterChatInputExecute

• `Optional` **afterChatInputExecute**: (`params`: { `data`: [`ChatInput`](../wiki/ChatInput) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`ChatInput`](../wiki/ChatInput) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1266](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1266)

___

### afterChatInputOptionExecute

• `Optional` **afterChatInputOptionExecute**: (`params`: { `data`: [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1274](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1274)

___

### afterCommandExecute

• `Optional` **afterCommandExecute**: (`params`: { `data`: [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `CommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `CommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1270](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1270)

___

### afterFormExecute

• `Optional` **afterFormExecute**: (`params`: { `data`: [`Form`](../wiki/Form) ; `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Form`](../wiki/Form) ; `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1254](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1254)

___

### afterInteractionExecute

• `Optional` **afterInteractionExecute**: (`params`: { `data`: [`Interaction`](../wiki/Exports#interaction) \| [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `Interaction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Interaction`](../wiki/Exports#interaction) \| [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `Interaction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1242](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1242)

___

### afterMessageCommandExecute

• `Optional` **afterMessageCommandExecute**: (`params`: { `data`: [`MessageContextCommand`](../wiki/MessageContextCommand) ; `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`MessageContextCommand`](../wiki/MessageContextCommand) ; `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1262](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1262)

___

### afterSelectMenuExecute

• `Optional` **afterSelectMenuExecute**: (`params`: { `data`: [`SelectMenu`](../wiki/SelectMenu) ; `interaction`: `AnySelectMenuInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`SelectMenu`](../wiki/SelectMenu) ; `interaction`: `AnySelectMenuInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1250](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1250)

___

### afterUserCommandExecute

• `Optional` **afterUserCommandExecute**: (`params`: { `data`: [`UserContextCommand`](../wiki/UserContextCommand) ; `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`UserContextCommand`](../wiki/UserContextCommand) ; `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1258](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1258)

___

### beforeAutocompleteExecute

• `Optional` **beforeAutocompleteExecute**: (`params`: { `data`: [`Autocomplete`](../wiki/Autocomplete) ; `interaction`: `AutocompleteInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Autocomplete`](../wiki/Autocomplete) ; `interaction`: `AutocompleteInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1318](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1318)

___

### beforeButtonExecute

• `Optional` **beforeButtonExecute**: (`params`: { `data`: [`Button`](../wiki/Button) ; `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Button`](../wiki/Button) ; `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1286](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1286)

___

### beforeChatInputExecute

• `Optional` **beforeChatInputExecute**: (`params`: { `data`: [`ChatInput`](../wiki/ChatInput) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`ChatInput`](../wiki/ChatInput) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1306](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1306)

___

### beforeChatInputOptionExecute

• `Optional` **beforeChatInputOptionExecute**: (`params`: { `data`: [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `ChatInputCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1314](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1314)

___

### beforeCommandExecute

• `Optional` **beforeCommandExecute**: (`params`: { `data`: [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `CommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `CommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1310](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1310)

___

### beforeFormExecute

• `Optional` **beforeFormExecute**: (`params`: { `data`: [`Form`](../wiki/Form) ; `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Form`](../wiki/Form) ; `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1294](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1294)

___

### beforeInteractionExecute

• `Optional` **beforeInteractionExecute**: (`params`: { `data`: [`Interaction`](../wiki/Exports#interaction) \| [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `Interaction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`Interaction`](../wiki/Exports#interaction) \| [`InteractionCommand`](../wiki/Exports#interactioncommand) \| [`ChatInputOption`](../wiki/Exports#chatinputoption) ; `interaction`: `Interaction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1282](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1282)

___

### beforeMessageCommandExecute

• `Optional` **beforeMessageCommandExecute**: (`params`: { `data`: [`MessageContextCommand`](../wiki/MessageContextCommand) ; `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`MessageContextCommand`](../wiki/MessageContextCommand) ; `interaction`: `MessageContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1302](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1302)

___

### beforeSelectMenuExecute

• `Optional` **beforeSelectMenuExecute**: (`params`: { `data`: [`SelectMenu`](../wiki/SelectMenu) ; `interaction`: `AnySelectMenuInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`SelectMenu`](../wiki/SelectMenu) ; `interaction`: `AnySelectMenuInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1290](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1290)

___

### beforeUserCommandExecute

• `Optional` **beforeUserCommandExecute**: (`params`: { `data`: [`UserContextCommand`](../wiki/UserContextCommand) ; `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `data`: [`UserContextCommand`](../wiki/UserContextCommand) ; `interaction`: `UserContextMenuCommandInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Defined in

[typings/index.d.ts:1298](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1298)
