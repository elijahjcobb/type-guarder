import { TType } from "./TType";
import { TContext } from "./context";
import { TError, TErrorRegex } from "./error";

export class TRegex extends TType<string> {
  public constructor(private readonly regex: RegExp) {
    super();
  }

  public readableName(): string {
    return this.regex.source;
  }

  public checkType(value: any, context: TContext): void {
    if (typeof value !== "string")
      throw new TError({
        value,
        context,
        parent: this,
      });
    if (!this.regex.test(value))
      throw new TErrorRegex({
        value,
        context,
        parent: this,
      });
  }
}
