# Interface: InteractionContents

Interaction auto reply feature contents

## Table of contents

### Properties

- [AUTOCOMPLETE\_INTERACTION\_MISSING](../wiki/InteractionContents#autocomplete_interaction_missing)
- [AUTOCOMPLETE\_INTERACTION\_MISSING\_EXEC](../wiki/InteractionContents#autocomplete_interaction_missing_exec)
- [BUTTON\_INTERACTION\_MISSING\_EXEC](../wiki/InteractionContents#button_interaction_missing_exec)
- [CHAT\_INPUT\_GROUP\_MISSING](../wiki/InteractionContents#chat_input_group_missing)
- [CHAT\_INPUT\_GROUP\_OPTION\_MISSING](../wiki/InteractionContents#chat_input_group_option_missing)
- [CHAT\_INPUT\_GROUP\_OPTION\_MISSING\_EXEC](../wiki/InteractionContents#chat_input_group_option_missing_exec)
- [CHAT\_INPUT\_INTERACTION\_MISSING](../wiki/InteractionContents#chat_input_interaction_missing)
- [CHAT\_INPUT\_INTERACTION\_MISSING\_EXEC](../wiki/InteractionContents#chat_input_interaction_missing_exec)
- [CHAT\_INPUT\_OPTION\_MISSING](../wiki/InteractionContents#chat_input_option_missing)
- [CHAT\_INPUT\_OPTION\_MISSING\_EXEC](../wiki/InteractionContents#chat_input_option_missing_exec)
- [ERROR](../wiki/InteractionContents#error)
- [FORM\_INTERACTION\_MISSING\_EXEC](../wiki/InteractionContents#form_interaction_missing_exec)
- [MESSAGE\_CONTEXT\_MENU\_MISSING\_EXEC](../wiki/InteractionContents#message_context_menu_missing_exec)
- [SELECT\_MENU\_INTERACTION\_MISSING\_EXEC](../wiki/InteractionContents#select_menu_interaction_missing_exec)
- [UNKNOWN\_INTERACTION](../wiki/InteractionContents#unknown_interaction)
- [USER\_CONTEXT\_MENU\_MISSING\_EXEC](../wiki/InteractionContents#user_context_menu_missing_exec)

## Properties

### AUTOCOMPLETE\_INTERACTION\_MISSING

• **AUTOCOMPLETE\_INTERACTION\_MISSING**: (`params`: { `interaction`: `AutocompleteInteraction`<`CacheType`\> ; `key`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the autocomplete interaction is missing

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `AutocompleteInteraction`<`CacheType`\> |
| `params.key` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1497](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1497)

___

### AUTOCOMPLETE\_INTERACTION\_MISSING\_EXEC

• **AUTOCOMPLETE\_INTERACTION\_MISSING\_EXEC**: (`params`: { `interaction`: `AutocompleteInteraction`<`CacheType`\> ; `key`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the autocomplete interaction exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `AutocompleteInteraction`<`CacheType`\> |
| `params.key` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1504](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1504)

___

### BUTTON\_INTERACTION\_MISSING\_EXEC

• **BUTTON\_INTERACTION\_MISSING\_EXEC**: (`params`: { `customId`: `string` ; `interaction`: `ButtonInteraction`<`CacheType`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the button interaction exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.customId` | `string` |
| `params.interaction` | `ButtonInteraction`<`CacheType`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1511](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1511)

___

### CHAT\_INPUT\_GROUP\_MISSING

• **CHAT\_INPUT\_GROUP\_MISSING**: (`params`: { `group`: `string` ; `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input group is missing

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.group` | `string` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1532](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1532)

___

### CHAT\_INPUT\_GROUP\_OPTION\_MISSING

• **CHAT\_INPUT\_GROUP\_OPTION\_MISSING**: (`params`: { `group`: `string` ; `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string` ; `option`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input group option is missing

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.group` | `string` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |
| `params.option` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1539](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1539)

___

### CHAT\_INPUT\_GROUP\_OPTION\_MISSING\_EXEC

• **CHAT\_INPUT\_GROUP\_OPTION\_MISSING\_EXEC**: (`params`: { `group`: `string` ; `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string` ; `option`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input group option exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.group` | `string` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |
| `params.option` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1551](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1551)

___

### CHAT\_INPUT\_INTERACTION\_MISSING

• **CHAT\_INPUT\_INTERACTION\_MISSING**: (`params`: { `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input interaction is missing

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1518](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1518)

___

### CHAT\_INPUT\_INTERACTION\_MISSING\_EXEC

• **CHAT\_INPUT\_INTERACTION\_MISSING\_EXEC**: (`params`: { `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input interaction exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1525](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1525)

___

### CHAT\_INPUT\_OPTION\_MISSING

• **CHAT\_INPUT\_OPTION\_MISSING**: (`params`: { `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string` ; `option`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input option is missing

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |
| `params.option` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1563](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1563)

___

### CHAT\_INPUT\_OPTION\_MISSING\_EXEC

• **CHAT\_INPUT\_OPTION\_MISSING\_EXEC**: (`params`: { `interaction`: `CommandInteraction`<`CacheType`\> ; `name`: `string` ; `option`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the chat input option exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `CommandInteraction`<`CacheType`\> |
| `params.name` | `string` |
| `params.option` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1570](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1570)

___

### ERROR

• **ERROR**: (`params`: { `error`: `Error` ; `interaction`: `Interaction`<`CacheType`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the interaction encounters a global error

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.error` | `Error` |
| `params.interaction` | `Interaction`<`CacheType`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1490](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1490)

___

### FORM\_INTERACTION\_MISSING\_EXEC

• **FORM\_INTERACTION\_MISSING\_EXEC**: (`params`: { `customId`: `string` ; `interaction`: `ModalSubmitInteraction`<`CacheType`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the form interaction exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.customId` | `string` |
| `params.interaction` | `ModalSubmitInteraction`<`CacheType`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1577](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1577)

___

### MESSAGE\_CONTEXT\_MENU\_MISSING\_EXEC

• **MESSAGE\_CONTEXT\_MENU\_MISSING\_EXEC**: (`params`: { `interaction`: `MessageContextCommandCommandInteraction` ; `name`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the message context menu exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `MessageContextCommandCommandInteraction` |
| `params.name` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1584](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1584)

___

### SELECT\_MENU\_INTERACTION\_MISSING\_EXEC

• **SELECT\_MENU\_INTERACTION\_MISSING\_EXEC**: (`params`: { `customId`: `string` ; `interaction`: [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the select menu exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.customId` | `string` |
| `params.interaction` | [`SelectMenuInteraction`](../wiki/Exports#selectmenuinteraction) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1603](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1603)

___

### UNKNOWN\_INTERACTION

• **UNKNOWN\_INTERACTION**: (`params`: { `interaction`: `Interaction`<`CacheType`\>  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when no other interaction has been taken

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `Interaction`<`CacheType`\> |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1591](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1591)

___

### USER\_CONTEXT\_MENU\_MISSING\_EXEC

• **USER\_CONTEXT\_MENU\_MISSING\_EXEC**: (`params`: { `interaction`: `UserContextCommandCommandInteraction` ; `name`: `string`  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when the user context menu exec function is not define

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction` | `UserContextCommandCommandInteraction` |
| `params.name` | `string` |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1596](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L1596)
