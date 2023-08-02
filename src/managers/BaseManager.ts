import Discord from 'discord.js';
import Sucrose from '../structures/Sucrose';
import Logger from '../structures/Logger';
import FolderService from '../services/FolderService';
import Base, { type BaseInternalData, type BaseData } from '../structures/Base';
import type { EnvOptions } from '../../typings';

export interface BaseManagerOptions<Data extends BaseData = BaseData> {
  class: new (data?: Data | BaseInternalData<Data> | Base<Data>) => Base<Data>;
  client: Sucrose;
  env: EnvOptions;
  path?: string | null;
}

export default abstract class BaseManager<
  Data extends BaseData = BaseData,
  Builder extends Base = Base<Data>,
> {
  public cache = new Discord.Collection<string, Builder>();

  protected logger = new Logger(this.constructor.name, { colored: true, console, verbose: false });

  protected key = this.constructor.name.toLowerCase();

  constructor(protected readonly options: BaseManagerOptions<Data>) { }

  public async load(to?: string | null, options?: {
    depth?: number,
    autoExcludeFileOnRecursive?: boolean,
  }) {
    const path = to || this.options.path;
    if (!path) throw new Error('Path not found.');

    const paths = FolderService.search({
      path,
      filter: { type: 'file', ext: this.options.env.ext },
      depth: options?.depth || 0,
      autoExcludeFileOnRecursive: options?.autoExcludeFileOnRecursive || false,
    });

    await Promise.all(paths.map(async (toFile) => {
      // eslint-disable-next-line new-cap
      const base = await new this.options.class().load(toFile) as Base;
      if (this.cache.has(base.label)) this.cache.delete(base.label);
      this.cache.set(base.label, base as Builder);
    }));

    return this;
  }

  public async refresh(data: string | Builder) {
    const base = typeof data === 'string' ? this.cache.get(data) : data;
    if (!base) throw new Error('Element not found in cache.');
    return base.refresh();
  }

  public async save(data: Builder | Data) {
    const newData = data as Base<Data> | Data;
    // eslint-disable-next-line new-cap
    const base = new this.options.class(newData) as Base;

    if (this.cache.has(base.label)) this.cache.delete(base.label);
    this.cache.set(base.label, base as Builder);

    return base as Builder;
  }
}
