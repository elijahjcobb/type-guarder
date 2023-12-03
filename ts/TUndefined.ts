import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export class TUndefined extends TType<undefined> {
  public readableName(): string {
    return "undefined";
  }
  public checkType(value: any, context?: TContext): void {
    if (value !== undefined)
      throw new TError({
        parent: this,
        value,
        context,
      });
  }
}
