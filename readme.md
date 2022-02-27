# Structure for discord bot with discord.js

## Documentations

Pas encore dispo

## Getting started

[Click here to get a example bot](./example)

- [Installations des modules](#installations-des-modules)
- [Configuration de sucrose](#configuration-de-sucrose)
- [Créez le fichier principal](#cr%C3%A9ez-le-fichier-principal)
- [Executez le fichier index](#executez-le-fichier-index)
- [Ajoutez une commande simple](#ajoutez-une-commande-simple)
- [Ajouter un évent ready](#ajouter-un-%C3%A9vent-ready)
- [Enregistrez votre commande avatar dans l'API](#enregistrez-votre-commande-avatar-dans-lapi)
- [Relancez votre application](#relancez-votre-application)
- [Ajoutez une commande avec des sous commandes](#ajoutez-une-commande-avec-des-sous-commandes)
- [Ajoutez une commande avec des groupes de sous commandes](#ajoutez-une-commande-avec-des-groupes-de-sous-commandes)
- [Créez une commande pour une guilde](#cr%C3%A9ez-une-commande-pour-une-guilde)
- [Créez un bouton](#cr%C3%A9ez-un-bouton)
- [Créez un select menu](#cr%C3%A9ez-un-select-menu)

Création d'un bot discord avec des events, interactions et slash commands

### # Installations des modules

```bash
npm i discord-sucrose
```

L'installation de ce module installe également discord.js

### # Configuration de sucrose

_sucrose.json_

```json
{
  "token": "your discord bot token",

  "env": {
    "extension": "js", // Mettre ts si vos fichiers sont en typescript
    "source": "./" // Dossier source de votre application
  }
}
```

### # Créez le fichier principal

_index.js_

```js
// On récupère notre client Sucrose
const { Sucrose } = require('discord-sucrose');

// On récupère les intents de discord.js
const { Intents } = require('discord.js');

// On récupère la config de notre client Sucrose
const config = require('./sucrose.json');

// On build notre Sucrose
Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
```

<details>
<summary>with typescript</summary>

_./commands/global/avatar.ts_

```ts
// On récupère notre client Sucrose
import { Sucrose } from 'discord-sucrose';

// On récupère les intents de discord.js
import { Intents } from 'discord.js';

// On récupère la config de notre client Sucrose
import config from './sucrose.json';

// On build notre Sucrose
Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
```

</details>

### # Executez le fichier index

```bash
node ./index.js
```

Vous devriez voir plusieurs message dans votre terminal indiquant que l'application est bien lancée

### # Ajoutez une commande simple

- `./commands` Créez un dossier commands qui comportera tout nos slash commandes
- `./commands/global` Dans celui-ci créez un dossier global qui comportera les commandes globales de notre application
- `./commands/global/avatar.js` Créez ensuite le fichier avatar.js qui contiendra notre commande avatar

_./commands/global/avatar.js_

```js
module.exports = {
  // body indique le corp de la commande qui sera envoyer à l'API
  body: {
    name: 'avatar',
    description: 'Get member avatar',
    options: [
      {
        type: 'USER',
        name: 'user',
        description: 'Member to get avatar',
      },
    ],
  },

  // Cette fonction sera envoyée a chaque appel de la commande
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
```

<details>
<summary>with typescript</summary>

_./commands/global/avatar.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  // body indique le corp de la commande qui sera envoyer à l'API
  body: {
    name: 'avatar',
    description: 'Get member avatar',
    options: [
      {
        type: 'USER',
        name: 'user',
        description: 'Member to get avatar',
      },
    ],
  },

  // Cette fonction sera envoyée a chaque appel de la commande
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
```

</details>

### # Ajouter un évent ready

- `./events` Créez le dossier contenant vos events
- `./events/ready` Créez le dossier concernant votre event
- `./events/ready/handler.js` Créez le fichier principal de votre event

_./events/ready/handler.js_

```js
// Cette fonction sera executée à chaque appel de l'évent
module.exports = ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
};
```

<details>
<summary>with typescript</summary>

_./events/ready/handler.ts_

```ts
import type { EventHandler } from 'discord-sucrose';

export const handler: EventHandler<'ready'> = ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
};
```

</details>

### # Enregistrez votre commande avatar dans l'API

Restez dans votre handler de l'évent ready

> Attention, votre commande peut mettre un certain temps avant d'être enregistrée dans l'API

_./events/ready/handler.js_

```js
module.exports = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);

  // Cette commande va engistrer le body de avatar dans l'API
  await sucrose.commands.define('avatar');
};
```

<details>
<summary>with typescript</summary>

_./events/ready/handler.ts_

```ts
import type { EventHandler } from 'discord-sucrose';

export const handler: EventHandler<'ready'> = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);

  // Cette commande va engistrer le body de avatar dans l'API
  await sucrose.commands.define('avatar');
};
```

</details>

### # Relancez votre application

```bash
node ./index.js
```

Votre évent et votre commande est maintenant chargée au sein de la structure. Votre évent ready a bien renvoyer son console.log() et votre commande est maintenant disponible sur votre bot, vous pouvez même l'utiliser

### # Ajoutez une commande avec des sous commandes

_./commands/global/games.js_

```js
module.exports = {
  body: {
    name: 'games',
    description: 'Play games',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'games',
    description: 'Play games',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

</details>

Maintenant on va créer une sous commande contenant un jeu

- `./commands/global/games` Créez un dossier qui contiendra nos sous commande
- `./commands/global/games/rock.js` Créez une sous commande

_./commands/global/games/rock.js_

```js
const choices = ['rock', 'paper', 'couic'];

module.exports = {
  option: {
    name: 'rock',
    description: 'Play rock, paper or couic',
    options: [
      {
        type: 'STRING',
        name: 'choice',
        description: 'rock, paper or couic ?',
        choices: [
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'couic', value: 'couic' },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    // Le reste du code ...
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games/rock.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

const choices = ['rock', 'paper', 'couic'];

export default <SubCommand>{
  option: {
    name: 'rock',
    description: 'Play rock, paper or couic',
    options: [
      {
        type: 'STRING',
        name: 'choice',
        description: 'rock, paper or couic ?',
        choices: [
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'couic', value: 'couic' },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    // Le reste du code ...
  },
};
```

</details>

Et ajoutez une autre sous commande

_./commands/global/games/random.js_

```js
module.exports = {
  option: {
    name: 'random',
    description: 'Get random number between 0 and 100',
  },

  exec: ({ interaction }) => {
    interaction.reply(Math.ceil(Math.random() * 100));
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/games/random.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    name: 'random',
    description: 'Get random number between 0 and 100',
  },

  exec: ({ interaction }) => {
    interaction.reply(Math.ceil(Math.random() * 100));
  },
};
```

</details>

### # Ajoutez une commande avec des groupes de sous commandes

_./commands/global/image.js_

```js
module.exports = {
  body: {
    name: 'image',
    description: 'Get a image',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'image',
    description: 'Get a image',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

</details>

Maintenant on va créer votre premier groupe de sous commande pour la commande image

- `./commands/global/image` Créez un dossier contenant vos groupes de sous commandes
- `./commands/global/image/animal.js` Créer notre fichier pour le groupe animal

_./commands/global/image/animal.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND_GROUP',
    name: 'animal',
    description: 'Get a animal image',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal.ts_

```ts
import type { SubCommandGroup } from 'discord-sucrose';

export default <SubCommandGroup>{
  option: {
    type: 'SUB_COMMAND_GROUP',
    name: 'animal',
    description: 'Get a animal image',
  },

  // Ici, pas besoins de fonction pour executé, car c'est partie ne s'executera jamais
};
```

</details>

Il ne vous reste à créer le dossier contenant tout les sous commandes de votre groupe

- `./commands/global/image/animal` Créez un sous dossier contenant les sous commande du groupe animal
- `./commands/global/image/animal/ferret.js` Créez un fichier pour une sous commande

_./commands/global/image/animal/ferret.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND',
    name: 'ferret',
    description: 'Get a ferret image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include ferret image>');
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal/ferret.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'ferret',
    description: 'Get a ferret image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include ferret image>');
  },
};
```

</details>

Et une autre sous commande

_./commands/global/image/animal/cat.js_

```js
module.exports = {
  option: {
    type: 'SUB_COMMAND',
    name: 'cat',
    description: 'Get a cat image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include cat image>');
  },
};
```

<details>
<summary>with typescript<summary>

_./commands/global/image/animal/cat.ts_

```ts
import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'cat',
    description: 'Get a cat image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include cat image>');
  },
};
```

</details>

### # Créez une commande pour une guilde

`<GuildId>` représente l'id de votre guilde

- `./commands/guilds` Créez le dossier contenant les guildes
- `./commands/guilds/<GuildId>` Créez le dossier de votre guilde
- `./commands/guilds/<GuildId>/say.js` Créez la commande pour votre guilde uniquement

_./commands/guilds/\<GuildId>/say.js_

```js
module.exports = {
  body: {
    name: 'say',
    description: 'say say say say say say',
  },

  exec: ({ interaction }) => {
    interaction.reply('say say say ?');
  },
};
```

</details>

<details>
<summary>with typescript<summary>

_./commands/guilds/\<GuildId>/say.ts_

```ts
import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'say',
    description: 'say say say say say say',
  },

  exec: ({ interaction }) => {
    interaction.reply('say say say ?');
  },
};
```

</details>

### # Créez un bouton

- `./interactions` Créez le dossier contenant vos interactions
- `./interactions/buttons` Créez le dossier contenant vos boutons
- `./interactions/buttons/click-me.js` Créez le fichier de votre bouton

_./interactions/buttons/click-me.js_

```js
module.exports = {
  data: {
    type: 'BUTTON',
    customId: 'useme', // Ou url
    style: 'DANGER', // Pas disponible pour un bouton url
  },

  // Pas besoins de l'exec si le bouton est un url
  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
```

</details>

<details>
<summary>with typescript<summary>

_./interactions/buttons/click-me.ts_

```ts
// Import button type
import type { Button } from 'discord-sucrose';

// Button<'url'> pour un boutton de type url
export default <Button<'base'>>{
  data: {
    type: 'BUTTON',
    customId: 'useme', // Ou url
    style: 'DANGER', // Pas disponible pour un bouton url
  },

  // Pas besoins de l'exec si le bouton est un url
  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
```

</details>

### # Créez un select menu

- `./interactions` Créez le dossier contenant vos interactions
- `./interactions/select-menus` Créez le dossier contenant vos select menus
- `./interactions/select-menus/select-me.js` Créez le fichier de votre select menu

_./interactions/select-menus/select-me.js_

```js
module.exports = {
  data: {
    type: 'SELECT_MENU',
    customId: 'selectme',
    placeholder: 'Select me !',
    options: [
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
    ],
  },

  exec: ({ interaction }) => {
    interaction.reply('I LOVE FERRET !!!');
  },
};
```

<details>
<summary>with typescript<summary>

_./interactions/select-menus/select-me.ts_

```ts
// Import select menu type
import type { SelectMenu } from 'discord-sucrose';

export default <SelectMenu>{
  data: {
    type: 'SELECT_MENU',
    customId: 'selectme',
    placeholder: 'Select me !',
    options: [
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
    ],
  },

  exec: ({ interaction }) => {
    interaction.reply('I LOVE FERRET !!!');
  },
};
```
