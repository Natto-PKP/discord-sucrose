import { ClientEvents } from 'discord.js';
import { BaseExecutable, BaseExecutableData, BaseExecutableParams } from './BaseExecutable';

/**
 * Event types
 * @public
 */
export type Events = keyof ClientEvents;

/**
 * Event params
 * @public
 */
export interface EventParams<E extends Events> extends BaseExecutableParams {
  /**
   * Discord event params
   */
  args: ClientEvents[E];
}

/**
 * Event data
 * @public
 * ```ts
 * import { EventData } from 'sucrose';
 *
 * export default <ModalData>{
 *   event: 'ready',
 *   label: 'my-event',
 *   execute: () => console.log('Hello world!'),
 * };
 * ```
 */
export interface EventData<E extends Events> extends BaseExecutableData<EventParams<E>> {
  event: E;
}

/**
 * Event
 * @public
 * @example
 * ```ts
 * import { Event } from 'sucrose';
 *
 * export default new Event('ready', {
 *  label: 'my-event',
 *  execute: () => console.log('Hello world!'),
 * });
 * ```
 */
export class Event<E extends Events> extends BaseExecutable<EventParams<E>> {
  public constructor(public event: E, data?: Omit<EventData<E>, 'event'>) {
    super(data);
  }

  public setEvent(event: E) {
    this.event = event;
    return this;
  }

  public override get data(): EventData<E> {
    return {
      ...super.data,
      event: this.event,
    };
  }
}
