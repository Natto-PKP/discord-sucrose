import { join, resolve } from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import Discord from 'discord.js';
import { Base, type BaseData } from '../structures/Base';

export interface BaseManagerLoadOptions {
  path: string;
  depth?: number;
}

/**
 * Base manager
 * @public
 */
export abstract class BaseManager<
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

    if (!d.label) throw new Error('label is required');

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
    } else {
      if (!data.label) throw new Error('label is required');
      if (this.collection.has(data.label)) this.collection.delete(data.label);
    }
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

  /**
   * get data from the collection
   * @param options - options to load
   */
  public async load(options: BaseManagerLoadOptions) {
    const path = resolve(process.cwd(), options.path);
    if (!existsSync(path)) return;
    if (!(await fs.stat(path)).isDirectory()) throw new Error('path must be a directory');

    const files = await fs.readdir(path);
    const { depth = 0 } = options;

    await Promise.all(files.map(async (file) => {
      const filePath = join(path, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        const data = await import(filePath);
        this.add(data.default);
      } else if (stat.isDirectory() && depth > 0) {
        await this.load({ path: filePath, depth: depth - 1 });
      }
    }));
  }
}
