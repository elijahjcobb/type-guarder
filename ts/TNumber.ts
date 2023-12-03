import { TType } from "./TType";
import { TContext } from "./context";
import { RangeBound, TError, TErrorNumber } from "./error";

export interface TNumberOptions {
  min?: number;
  max?: number;
}

export class TNumber extends TType<number> {
  private readonly options?: TNumberOptions;

  constructor(options?: TNumberOptions) {
    super();
    this.options = options;
  }

  public readableName(): string {
    return "number";
  }

  protected isValidSubtype(value: any): boolean {
    return true;
  }

  public checkType(value: any, context: TContext): void {
    const type = typeof value;
    if (type !== "number")
      throw new TError({
        value,
        context,
        parent: this,
      });
    if (!this.isValidSubtype(value)) {
      throw new TError({
        value,
        context,
        parent: this,
      });
    }
    if (this.options?.min && value < this.options.min)
      throw new TErrorNumber(this.options.min, RangeBound.MIN, {
        value,
        context,
        parent: this,
      });

    if (this.options?.max && value > this.options.max)
      throw new TErrorNumber(this.options.max, RangeBound.MAX, {
        value,
        context,
        parent: this,
      });
  }
}

export class TInteger extends TNumber {
  public readableName(): string {
    return "integer";
  }
  protected isValidSubtype(value: any): boolean {
    return Number.isInteger(value);
  }
}

export class TFloat extends TNumber {
  public readableName(): string {
    return "float";
  }
  protected isValidSubtype(value: any): boolean {
    return !Number.isInteger(value);
  }
}
