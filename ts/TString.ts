import { TType } from "./TType";
import { TContext } from "./context";
import { RangeBound, TError, TErrorStringLength } from "./error";

export interface TStringOptions {
  minLength?: number;
  maxLength?: number;
}

export class TString extends TType<string> {
  private readonly options: TStringOptions;

  constructor(options?: TStringOptions) {
    super();
    this.options = {
      minLength: 0,
      maxLength: Infinity,
      ...options,
    };
  }

  public readableName(): string {
    return "string";
  }
  public checkType(value: any, context: TContext): void {
    const type = typeof value;
    if (type !== "string")
      throw new TError({
        value,
        context,
        parent: this,
      });
    if (this.options?.minLength && value.length < this.options.minLength)
      throw new TErrorStringLength(this.options.minLength, RangeBound.MIN, {
        value,
        context,
        parent: this,
      });
    if (this.options?.maxLength && value.length > this.options.maxLength)
      throw new TErrorStringLength(this.options.maxLength, RangeBound.MAX, {
        value,
        context,
        parent: this,
      });
  }
}
