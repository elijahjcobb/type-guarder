import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export class TValue<T> extends TType<T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }
  public readableName(): string {
    return JSON.stringify(this.value);
  }
  public checkType(v: any, context: TContext): void {
    if (v !== this.value)
      throw new TError({
        value: v,
        context,
        parent: this,
      });
  }
}
