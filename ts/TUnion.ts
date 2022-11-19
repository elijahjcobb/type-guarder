/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TType } from "./TType";

export class TUnion<T> extends TType<T> {
  protected readonly types: TType<T>[];

  protected constructor(types: TType<T>[]) {
    super();
    this.types = types;
  }

  public conforms(value: any): boolean {
    for (const type of this.types) {
      const conformity: boolean = type.conforms(value);
      if (conformity) return true;
    }

    return false;
  }

  public static any<T>(...types: TType<T>[]): TType<T> {
    return new TUnion(types);
  }
}
