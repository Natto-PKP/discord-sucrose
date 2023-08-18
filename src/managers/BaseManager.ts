import Discord from 'discord.js';
import Base, { type BaseData } from '../structures/Base';

/**
 * Base manager
 * @public
 */
export default abstract class BaseManager<
  Structure extends Base = Base,
  Data extends BaseData = BaseData,
> {
  /**
   * structure to use
   * @internal
   */
  protected abstract readonly _structure: typeof Base;

  /**
   * collection of data
   */
  public collection = new Discord.Collection<string, Structure>();

  /**
   * add data to the collection
   * @param data - data to add
   */
  public add(data: Structure | Data) {
    // eslint-disable-next-line no-underscore-dangle
    const d = data instanceof Base ? data : new this._structure(data) as Structure;

    if (this.collection.has(d.label)) this.collection.delete(d.label);
    this.collection.set(d.label, d);
  }

  /**
   * remove data from the collection
   * @param data - data to remove
   */
  public remove(data: Structure | Data | string) {
    if (typeof data === 'string') {
      if (this.collection.has(data)) this.collection.delete(data);
    } else if (this.collection.has(data.label)) this.collection.delete(data.label);
  }

  /**
   * return data from a string or another data
   * @param data - data to resolve
   * @returns
   */
  public resolve(data: Structure | Data | string) {
    if (typeof data === 'string') return this.collection.get(data);
    return data;
  }
}
