import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export class TBoolean extends TType<boolean> {
  public readableName(): string {
    return "boolean";
  }
  public checkType(value: any, context?: TContext): void {
    const type = typeof value;
    if (type !== "boolean")
      throw new TError({
        parent: this,
        value,
        context,
      });
  }
}
