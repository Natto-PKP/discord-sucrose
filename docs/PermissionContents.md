# Interface: PermissionContents

Permission

## Table of contents

### Properties

- [CHANNEL\_NOT\_ALLOWED](../wiki/PermissionContents#channel_not_allowed)
- [GUILD\_NOT\_ALLOWED](../wiki/PermissionContents#guild_not_allowed)
- [GUILD\_ONLY](../wiki/PermissionContents#guild_only)
- [MEMBER\_PERMISSION\_MISSING](../wiki/PermissionContents#member_permission_missing)
- [PRIVATE\_ONLY](../wiki/PermissionContents#private_only)
- [ROLE\_NOT\_ALLOWED](../wiki/PermissionContents#role_not_allowed)
- [SELF\_PERMISSION\_MISSING](../wiki/PermissionContents#self_permission_missing)
- [USER\_NOT\_ALLOWED](../wiki/PermissionContents#user_not_allowed)

## Properties

### CHANNEL\_NOT\_ALLOWED

• **CHANNEL\_NOT\_ALLOWED**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

channel id is not allowed for this

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1650](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1650)

___

### GUILD\_NOT\_ALLOWED

• **GUILD\_NOT\_ALLOWED**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

guild id is not allowed for this

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1668](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1668)

___

### GUILD\_ONLY

• **GUILD\_ONLY**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when interaction can only be used in private channel

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1659](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1659)

___

### MEMBER\_PERMISSION\_MISSING

• **MEMBER\_PERMISSION\_MISSING**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

member don't have required permissions

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1677](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1677)

___

### PRIVATE\_ONLY

• **PRIVATE\_ONLY**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

when interaction can only be used in private message

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1704](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1704)

___

### ROLE\_NOT\_ALLOWED

• **ROLE\_NOT\_ALLOWED**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

role id is not allowed to use this

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1695](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1695)

___

### SELF\_PERMISSION\_MISSING

• **SELF\_PERMISSION\_MISSING**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

client don't have required permissions

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1713](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1713)

___

### USER\_NOT\_ALLOWED

• **USER\_NOT\_ALLOWED**: (`params`: { `interaction?`: `Interaction`<`CacheType`\> ; `message?`: `Message`<`boolean`\> ; `permission`: [`Permission`](../wiki/Exports#permission)  }) => [`ContentReturn`](../wiki/Exports#contentreturn)

#### Type declaration

▸ (`params`): [`ContentReturn`](../wiki/Exports#contentreturn)

user id is not allowed to use this

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.interaction?` | `Interaction`<`CacheType`\> |
| `params.message?` | `Message`<`boolean`\> |
| `params.permission` | [`Permission`](../wiki/Exports#permission) |

##### Returns

[`ContentReturn`](../wiki/Exports#contentreturn)

#### Defined in

[typings/index.d.ts:1686](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1686)
