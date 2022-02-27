import { Sucrose } from 'discord-sucrose'; 
import { Intents } from 'discord.js'; 

import config from './sucrose.json';
 
Sucrose.build({ intents: [Intents.FLAGS.GUILDS], ...config });