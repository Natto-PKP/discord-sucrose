import Command, { type CommandData, type CommandParams, type CommandBody } from '../structures/Command';
import BaseInteractionManager from './BaseInteractionManager';

export default class CommandManager extends BaseInteractionManager<
CommandParams,
CommandBody,
Command,
CommandData
> {
  protected override readonly _structure = Command;
}
