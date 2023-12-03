import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export class TUnion<T extends TType<any>[]> extends TType<
  T[number] extends TType<infer U> ? U : never
> {
  protected values: T;

  public constructor(...values: T) {
    super();
    this.values = values;
  }

  public readableName(): string {
    return this.values.map((v) => v.readableName()).join(" | ");
  }
  public checkType(value: any, context: TContext): void {
    let error: TError<T> | undefined;
    for (const type of this.values) {
      try {
        type.checkType(value, context);
        error = undefined;
        break;
      } catch (e) {
        error = new TError({
          parent: e instanceof TError ? e.parentType : this,
          value,
          context,
        });
      }
    }
    if (error) throw error;
  }
}
