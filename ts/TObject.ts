/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TType } from "./TType";

export type TObjectTypeDefinition<T> = {
  [K in keyof T]: T[K] extends TType<any> ? T[K] : never;
};

export class TObject<T extends TObjectTypeDefinition<T>> extends TType<{
  [K in keyof T]: T[K] extends TType<infer V> ? V : never;
}> {
  protected readonly type: TObjectTypeDefinition<T>;

  protected constructor(types: TObjectTypeDefinition<T>) {
    super();
    this.type = types;
  }

  public conforms(value: any): boolean {
    if (typeof value !== "object") return false;

    let countedKeys: number = Object.keys(this.type).length;

    for (const k in this.type) {
      const v: any = value[k];
      const expectedValue: TType<T> | undefined = this.type[k];
      if (expectedValue === undefined) continue;
      const conformity: boolean = expectedValue.conforms(v);
      if (!conformity) return false;
      countedKeys--;
    }

    return countedKeys === 0;
  }

  public static follow<T extends TObjectTypeDefinition<T>>(
    type: TObjectTypeDefinition<T>
  ): TType<{
    [K in keyof T]: T[K] extends TType<infer V> ? V : never;
  }> {
    return new TObject(type);
  }
}
