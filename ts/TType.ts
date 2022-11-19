/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

export abstract class TType<T> {
  protected constructor() {}

  public abstract conforms(value: any): boolean;

  public verify(value: any): T | undefined {
    if (!this.conforms(value)) return undefined;
    return value as unknown as T;
  }

  public force(value: any): T {
    if (!this.conforms(value))
      throw new Error("Oxygen found a type that does not conform.");
    return value as unknown as T;
  }
}
