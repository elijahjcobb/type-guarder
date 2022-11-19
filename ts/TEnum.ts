/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TType } from "./TType";

export class TEnum<T> extends TType<T> {
  protected values: T[];

  protected constructor(values: T[]) {
    super();
    this.values = values;
  }

  public conforms(value: any): boolean {
    return this.values.indexOf(value) !== -1;
  }

  public static any<T>(...values: T[]): TType<T> {
    return new TEnum(values);
  }
}
