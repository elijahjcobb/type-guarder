import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export class TNull extends TType<null> {
  public readableName(): string {
    return "null";
  }
  public checkType(value: any, context?: TContext): void {
    if (value !== null)
      throw new TError({
        parent: this,
        value,
        context,
      });
  }
}
