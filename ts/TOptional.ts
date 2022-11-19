/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TType } from "./TType";

export class TOptional<T> extends TType<T | undefined> {
  protected readonly type: TType<T>;

  protected constructor(type: TType<T>) {
    super();
    this.type = type;
  }

  public conforms(value: any): boolean {
    if (value === undefined) return true;
    return this.type.conforms(value);
  }

  public static maybe<T>(type: TType<T>): TType<T | undefined> {
    return new TOptional(type);
  }
}
