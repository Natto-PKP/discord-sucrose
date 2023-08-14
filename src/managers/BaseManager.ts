import Discord from 'discord.js';
import Base, { type BaseData } from '../structures/Base';

export default abstract class BaseManager<
  Structure extends Base = Base,
  Data extends BaseData = BaseData,
> {
  protected abstract readonly _structure: typeof Base;

  public collection = new Discord.Collection<string, Structure>();

  public add(data: Structure | Data) {
    // eslint-disable-next-line no-underscore-dangle
    const d = data instanceof Base ? data : new this._structure(data) as Structure;

    if (this.collection.has(d.label)) this.collection.delete(d.label);
    this.collection.set(d.label, d);
  }

  public remove(data: Structure | Data | string) {
    if (typeof data === 'string') {
      if (this.collection.has(data)) this.collection.delete(data);
    } else if (this.collection.has(data.label)) this.collection.delete(data.label);
  }
}
