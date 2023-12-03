/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TContext } from "./context";

export abstract class TType<T> {
  public abstract readableName(): string;
  public abstract checkType(value: any, context: TContext): void;

  public assert(value: any): T {
    this.checkType(value, new TContext());
    return value as unknown as T;
  }

  public conforms(value: any): boolean {
    try {
      this.assert(value);
      return true;
    } catch {
      return false;
    }
  }

  public unwrap(value: any): T | null {
    if (!this.conforms(value)) return null;
    return value as unknown as T;
  }
}
