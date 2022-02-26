import Discord from 'discord.js'
import dotenv from 'dotenv';
import { Sucrose } from "../src";
// import type { ChatInputData } from '../typings';
dotenv.config();

const guildId = '813453131698536458';

Sucrose.build({ intents: [Discord.Intents.FLAGS.GUILDS], env: { directories: { source: 'tests' } } }).then(async (sucrose) => {  
  const guild = sucrose.commands.guilds.get(guildId)
  if(!guild) return
 
  // const command = <ChatInputData>guild.collection.get('command')
  // console.log(command.body)
  // console.log(command.body.options)
  // console.log(...(command.body.options||[]))
  // console.log(command.options)

  // await guild.define(["avatar", "command", "hello"])
})