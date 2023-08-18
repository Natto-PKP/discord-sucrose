/**
 * Base data
 * @public
 * @example
 * ```ts
 * import { BaseData } from 'sucrose';
 *
 * export default <BaseData>{
 *   label: 'my-base',
 *   description: 'My base description',
 *   tags: ['tag1', 'tag2'],
 *   disabled: false,
 * };
 * ```
 */
export interface BaseData {
  /**
   * label is a key wich is used in the manager collection
   */
  label: string;

  /**
   * description is only used for documentation purposes, i think. not sure
   */
  description?: string | null;

  /**
   * tags are used for filtering and documentation purposes
   */
  tags?: string[] | null;

  /**
   * disable it if you don't want it to be used
   */
  disabled?: boolean | null;
}

/**
 * Base structure
 * @public
 * @example
 * ```ts
 * import { Base } from 'sucrose';
 *
 * const base = new Base('my-base');
 * base.addTags('tag1', 'tag2');
 * base.removeTags('tag2');
 * base.disable();
 *
 * export default base;
 * ```
 * @example
 * ```ts
 * import { Base } from 'sucrose';
 *
 * const data = <BaseData>{
 *   label: 'my-base',
 *   description: 'My base description',
 *   tags: ['tag1', 'tag2'],
 *   disabled: false,
 * };
 *
 * export default new Base(data);
 * ```
 */
export default class Base {
  /**
   * label is a key wich is used in the manager collection
   */
  public label: string;

  /**
   * description is only used for documentation purposes, i think. not sure
   */
  public description?: string | null;

  /**
   * tags are used for filtering and documentation purposes
   */
  public tags?: string[] | null;

  /**
   * disable it if you don't want it to be used
   */
  public disabled?: boolean | null;

  constructor(data?: Base | BaseData | string | null) {
    const d = (data instanceof Base ? data.data : data) ?? this.data;
    const label = typeof d === 'string' ? d : d?.label || null;

    this.label = label as string;

    if (typeof d === 'string') return;
    this.description = d.description ?? null;
    this.tags = d.tags ?? null;
    this.disabled = d.disabled ?? null;
  }

  /**
   * get base data
   */
  public get data(): BaseData {
    return {
      label: this.label,
      description: this.description,
      tags: this.tags,
      disabled: this.disabled,
    };
  }

  /**
   * get base data in json format
   * @returns - stringified json
   */
  public toJSON(): string {
    return JSON.stringify(this.data);
  }

  /**
   * set label
   * @param label - label to set
   * @returns - this
   */
  public setLabel(label: string): this {
    this.label = label;
    return this;
  }

  /**
   * set description
   * @param description - description to set
   * @returns - this
   */
  public setDescription(description: string | null): this {
    this.description = description;
    return this;
  }

  /**
   * add tags
   * @param tags - tags to add
   * @returns - this
   */
  public addTags(...tags: string[]): this {
    this.tags = this.tags ?? [];
    this.tags.push(...tags);
    return this;
  }

  /**
   * remove tags
   * @param tags - tags to remove
   * @returns - this
   */
  public removeTags(...tags: string[]): this {
    this.tags = this.tags?.filter((tag) => !tags.includes(tag)) ?? null;
    return this;
  }

  /**
   * set tags
   * @param tags - tags to set
   * @returns - this
   */
  public setTags(tags: string[] | null): this {
    this.tags = tags;
    return this;
  }

  /**
   * disable this
   * @returns - this
   */
  public disable(): this {
    this.disabled = true;
    return this;
  }

  /**
   * enable this
   * @returns - this
   */
  public enable(): this {
    this.disabled = false;
    return this;
  }

  /**
   * enable/disable this
   * @returns - this
   */
  public toggle(): this {
    this.disabled = !this.disabled;
    return this;
  }
}
