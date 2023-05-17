# Interface: Form

Form interaction

**`Example`**

```js
const { ComponentType, InteractionType, TextInputStyle } = require('discord.js');

module.exports = {
 body: {
   customId: 'report',
   title: 'Report form',
   components: [{
     type: ComponentType.ActionRow,
     components: [{
       customId: 'reason',
       style: TextInputStyle.Paragraph,
       label: 'Report reason',
       minLength: 10,
       maxLength: 500,
     }],
   }],
 },

 exec: async ({ interaction }) => {
   const reason = interaction.fields.getTextInputValue('reason');
   await interaction.reply(reason);
 }
};
```

## Hierarchy

- [`BaseInteraction`](../wiki/BaseInteraction)<{ `interaction`: `Discord.ModalSubmitInteraction`  }\>

  ↳ **`Form`**

  ↳↳ [`FormData`](../wiki/FormData)

## Table of contents

### Properties

- [body](../wiki/Form#body)
- [conditions](../wiki/Form#conditions)
- [cooldowns](../wiki/Form#cooldowns)
- [custom](../wiki/Form#custom)
- [description](../wiki/Form#description)
- [exec](../wiki/Form#exec)
- [hooks](../wiki/Form#hooks)
- [permissions](../wiki/Form#permissions)
- [tags](../wiki/Form#tags)

## Properties

### body

• **body**: `ModalComponentData`

Interaction form

#### Defined in

[typings/index.d.ts:1164](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L1164)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ModalSubmitInteraction`<`CacheType`\>  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ModalSubmitInteraction`<`CacheType`\>  }\>[]

Manage custom conditions

**`Remarks`**

It's used for custom conditions,
you must manage the reply because is not handled by Sucrose.
You can do these example with just Permission

**`Example`**

```js
{ callback: ({ interaction }) => interaction.guild.id === '713172382042423352' }
```

**`Example`**

```js
[
  { callback: ({ interaction }) => interaction.guild.id === '713172382042423352' },
  { callback: ({ interaction }) => interaction.user.id === '1068866278321831987' },
]
```

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[conditions](../wiki/BaseInteraction#conditions)

#### Defined in

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L913)

___

### cooldowns

• `Optional` **cooldowns**: [`Cooldown`](../wiki/Exports#cooldown) \| [`Cooldown`](../wiki/Exports#cooldown)[]

Manage cooldowns

**`Example`**

```js
{
  type: "EVERYONE",
  value: 3 * 1000,
}
```

**`Example`**

```js
[
  {
    type: "ROLE",
    excluded: ["570642674151981135"],
    value: 5 * 1000,
  },
  {
    type: "GUILD_MEMBER",
    value: 1 * 1000,
  },
]
```

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[cooldowns](../wiki/BaseInteraction#cooldowns)

#### Defined in

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[custom](../wiki/BaseInteraction#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[description](../wiki/BaseInteraction#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[exec](../wiki/BaseInteraction#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: `ModalSubmitInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[hooks](../wiki/BaseInteraction#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L928)

___

### permissions

• `Optional` **permissions**: [`Permission`](../wiki/Exports#permission) \| [`Permission`](../wiki/Exports#permission)[]

Manage interaction required permissions

**`Example`**

```js
{
  type: "MEMBER",
  permissions: ["ADMINISTRATOR"],
}
```

**`Example`**

```js
[
  {
    type: "SELF",
    permissions: ["MANAGE_SERVER"],
  },
  {
    type: "CHANNEL",
    allowed: ["713309212855238707"],
  }
]
```

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[permissions](../wiki/BaseInteraction#permissions)

#### Defined in

[typings/index.d.ts:691](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L691)

___

### tags

• `Optional` **tags**: `string`[]

customize with some tags

**`Example`**

```js
["moderation", "admin", "management"]
```

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[tags](../wiki/BaseInteraction#tags)

#### Defined in

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L951)
