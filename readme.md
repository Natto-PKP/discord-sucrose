# Structure for discord bot with discord.js

## Documentations

## Getting started

### Install module

```bash
npm i discord-sucrose
```

### Setup structure

_secret.json_

```json
{
  "token": "your discord bot token",

  "env": {
    "extension": "js",
    "source": "./"
  }
}
```

### Create index file

_index.js_

```js
const { Sucrose } = require('discord-sucrose');
const { Intents } = require('discord.js');
require('dotenv').config();

const config = require('./secret.json');

Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
```

### Run index file

```bash
node ./index.js
```

Your discord bot is ready
