# Interface: Button

Button interaction object

**`Example`**

```js
const { ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
 body: {
   customId: 'use-me',
   type: ComponentType.Button,
   style: ButtonStyle.Primary,
   label: 'Use me',
 },

 exec: async ({ interaction }) => {
   await interaction.reply('Yeaaaah');
 },
};
```

## Hierarchy

- [`BaseInteraction`](../wiki/BaseInteraction)<{ `interaction`: `Discord.ButtonInteraction`  }\>

  ↳ **`Button`**

  ↳↳ [`ButtonData`](../wiki/ButtonData)

## Table of contents

### Properties

- [body](../wiki/Button#body)
- [conditions](../wiki/Button#conditions)
- [cooldowns](../wiki/Button#cooldowns)
- [custom](../wiki/Button#custom)
- [description](../wiki/Button#description)
- [exec](../wiki/Button#exec)
- [hooks](../wiki/Button#hooks)
- [permissions](../wiki/Button#permissions)
- [tags](../wiki/Button#tags)

## Properties

### body

• **body**: `ButtonComponentData`

Interaction body

#### Defined in

[typings/index.d.ts:731](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L731)

___

### conditions

• `Optional` **conditions**: [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ButtonInteraction`<`CacheType`\>  }\> \| [`Condition`](../wiki/Exports#condition)<{ `interaction`: `ButtonInteraction`<`CacheType`\>  }\>[]

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

[typings/index.d.ts:913](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L913)

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

[typings/index.d.ts:666](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L666)

___

### custom

• `Optional` **custom**: `Object`

Whatever you want, you can add it here

#### Index signature

▪ [key: `any`]: `any`

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[custom](../wiki/BaseInteraction#custom)

#### Defined in

[typings/index.d.ts:918](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L918)

___

### description

• `Optional` **description**: `string`

A field to add description

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[description](../wiki/BaseInteraction#description)

#### Defined in

[typings/index.d.ts:923](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L923)

___

### exec

• `Optional` **exec**: (`params`: { `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown`

#### Type declaration

▸ (`params`): `unknown`

callback executed when this is called

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | { `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams) |

##### Returns

`unknown`

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[exec](../wiki/BaseInteraction#exec)

#### Defined in

[typings/index.d.ts:957](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L957)

___

### hooks

• `Optional` **hooks**: `Object`

Add hooks to this

#### Type declaration

| Name | Type |
| :------ | :------ |
| `afterExecute?` | (`params`: { `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |
| `beforeExecute?` | (`params`: { `interaction`: `ButtonInteraction`<`CacheType`\>  } & [`BaseParams`](../wiki/Exports#baseparams)) => `unknown` |

#### Inherited from

[BaseInteraction](../wiki/BaseInteraction).[hooks](../wiki/BaseInteraction#hooks)

#### Defined in

[typings/index.d.ts:928](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L928)

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

[typings/index.d.ts:691](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L691)

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

[typings/index.d.ts:951](https://github.com/Natto-PKP/discord-sucrose/blob/a2c6566/typings/index.d.ts#L951)
