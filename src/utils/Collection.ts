import Discord from 'discord.js';

/* Types */
import type Types from '../../typings';

export class Collection<K, V> extends Discord.Collection<K, V> implements Types.Collection<K, V> {
  /**
   * Convert collection to an array
   */
  public get array(): [K, V][] {
    return Array.from(this);
  }
}
