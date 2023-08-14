import { ButtonBuilder } from "discord.js";
import type { ButtonData } from "../../src/structures/Button";

export default <ButtonData>{
  label: 'test',
  description: 'test',
  tags: ['test'],

  cooldowns: [{ label: 'test', duration: 1000, type: 'GUILD' }],
  permissions: [{ label: 'test', type: 'USER', allowed: ['4512985654'] }],

  body: new ButtonBuilder().setStyle(1).setLabel('test').setCustomId('test').toJSON(),

  beforeExecute: (params) => console.log(params),
  afterExecute: (params) => console.log(params),

  execute: (params) => console.log(params),
}