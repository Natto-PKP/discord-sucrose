const { Sucrose } = require('discord-sucrose');
const { Intents } = require('discord.js');

const config = require('./sucrose.json');

Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });
