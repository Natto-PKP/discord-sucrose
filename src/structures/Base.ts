export interface BaseData {
  label: string;
  description?: string | null;
  tags?: string[] | null;
  disabled?: boolean | null;
}

export default class Base {
  public label: string;

  public description?: string | null;

  public tags?: string[] | null;

  public disabled?: boolean | null;

  constructor(data?: BaseData | Base | string | null) {
    const d = (data instanceof Base ? data.data : data) ?? this.data;
    const label = typeof d === 'string' ? d : d.label;

    this.label = label;

    if (typeof d === 'string') return;
    this.description = d.description ?? null;
    this.tags = d.tags ?? null;
    this.disabled = d.disabled ?? null;
  }

  public get data(): BaseData {
    return {
      label: this.label,
      description: this.description,
      tags: this.tags,
      disabled: this.disabled,
    };
  }

  public addTags(...tags: string[]): this {
    this.tags = this.tags ?? [];
    this.tags.push(...tags);
    return this;
  }

  public removeTags(...tags: string[]): this {
    this.tags = this.tags?.filter((tag) => !tags.includes(tag)) ?? null;
    return this;
  }

  public disable(): this {
    this.disabled = true;
    return this;
  }

  public enable(): this {
    this.disabled = false;
    return this;
  }

  public toggle(): this {
    this.disabled = !this.disabled;
    return this;
  }
}
