// # Récupérer des trucs en commun sur la classe BaseInteraction
// # Et extend BaseInteraction avec la classe Base

export interface BaseData {
  label: string;
  description?: string | null;
  tags?: string[] | null;

  disabled?: boolean | null;
}

export type BaseInternalData<Data> = Data & { path?: string | null; };

export default abstract class Base<Data extends BaseData = BaseData> {
  protected data = { } as BaseInternalData<Data>;

  public constructor(data?: Data | BaseInternalData<Data> | Base<Data>) {
    if (data) {
      const object = data instanceof Base ? data.toJSON() : data;
      this.verify(object);
      this.data = object;
    }
  }

  /**
   * Add tag
   * @param tag - Tag
   * @returns - This
   */
  public addTag(tag: string): this {
    if (!this.data.tags) this.data.tags = [tag];
    else this.data.tags.push(tag);
    return this;
  }

  /**
   * Remove tag
   * @param tag - Tag
   * @returns - This
   */
  public removeTag(tag: string): this {
    if (!this.data.tags) return this;
    this.data.tags = this.data.tags.filter((t) => t !== tag);
    return this;
  }

  /**
   * Set description
   * @param description - Description
   * @returns - This
   */
  public setDescription(description: string | null): this {
    this.data.description = description;
    return this;
  }

  /**
   * Set tags
   * @param tags - Tags
   * @returns - This
   */
  public setTags(tags: string[] | null): this {
    this.data.tags = tags;
    return this;
  }

  /**
   * Set disabled
   * @param disabled - Disabled
   * @returns - This
   */
  public setDisabled(disabled: boolean | null): this {
    this.data.disabled = disabled;
    return this;
  }

  /**
   * Set label
   * @param label - Label
   * @returns - This
   */
  public setLabel(label: string): this {
    this.data.label = label;
    return this;
  }

  /**
   * Enable interaction
   * @returns - This
   */
  public enable(): this {
    this.data.disabled = false;
    return this;
  }

  /**
   * Disable interaction
   * @returns - This
   */
  public disable(): this {
    this.data.disabled = true;
    return this;
  }

  /**
   * Load interaction
   * @param to - Path to interaction
   */
  public async load(to?: string) {
    const pathTo = to || this.data.path;
    if (!pathTo) throw new Error('to is required.');

    const object = await import(pathTo);
    const data = (object.default ?? object) as Data | Base<Data>;
    const newData = data instanceof Base ? data.toJSON() : data;

    this.verify(newData);
    this.data = newData;
    this.data.path = pathTo;

    return this;
  }

  /**
   * Check interaction
   * @param data - Data
   * @returns - This
   */
  public verify(data?: Data): boolean {
    const object = data || this.data;

    if (!object.label) throw new Error('data.label is required.');
    if (typeof object.label !== 'string') throw new Error('data.label must be a string.');
    if (object.description && typeof object.description !== 'string') throw new Error('data.description must be a string.');
    if (object.tags && !Array.isArray(object.tags)) throw new Error('data.tags must be an array.');
    if (object.tags && !object.tags.every((tag) => typeof tag === 'string')) throw new Error('data.tags must be an array of strings.');
    if (object.disabled && typeof object.disabled !== 'boolean') throw new Error('data.disabled must be a boolean.');

    return true;
  }

  /**
   * Refresh interaction
   * @returns - This
   */
  public async refresh(to?: string | null) {
    if (!this.data.path && !to) return this;
    return this.load(this.data.path || to!);
  }

  /**
   * Return json object of the interaction
   * @internal
   */
  public toJSON() {
    return this.data;
  }

  public get label() {
    return this.data.label;
  }

  public get description() {
    return this.data.description;
  }

  public get tags() {
    return this.data.tags;
  }

  public get disabled() {
    return this.data.disabled;
  }

  public get path() {
    return this.data.path;
  }
}
