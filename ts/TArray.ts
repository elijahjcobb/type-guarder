import { TType } from "./TType";
import { TContext } from "./context";
import { RangeBound, TError, TErrorArrayLength } from "./error";

export interface TArrayOptions {
  minLength?: number;
  maxLength?: number;
}

export class TArray<
  T extends TType<any>[],
  X = (T[number] extends TType<infer U> ? U : never[])[]
> extends TType<X> {
  public readonly types: T;
  public readonly options?: TArrayOptions;

  public constructor({
    types,
    options,
  }: {
    types: T;
    options?: TArrayOptions;
  }) {
    super();
    this.types = types;
    this.options = options;
  }

  public readableName(): string {
    const showBrackets = this.types.length > 1;
    const showCount =
      this.options?.minLength !== undefined ||
      this.options?.maxLength !== undefined;
    return `${showBrackets ? "(" : ""}${this.types
      .map((type) => type.readableName())
      .join(" | ")}${showBrackets ? ")" : ""}[]${
      showCount
        ? `(${this.options.minLength ?? "-"}, ${this.options.maxLength ?? "-"})`
        : ""
    }`;
  }
  public checkType(value: any, context: TContext): void {
    if (!Array.isArray(value)) {
      throw new TError({
        parent: this,
        value,
        context,
      });
    }

    if (this.options?.minLength && value.length < this.options.minLength)
      throw new TErrorArrayLength(this.options.minLength, RangeBound.MIN, {
        parent: this,
        value,
        context,
      });

    if (this.options?.maxLength && value.length > this.options.maxLength)
      throw new TErrorArrayLength(this.options.maxLength, RangeBound.MAX, {
        parent: this,
        value,
        context,
      });

    let i = 0;
    for (const item of value) {
      let error: TError<X> | undefined;
      for (const type of this.types) {
        try {
          const newContext = context.addTrace(`${i}`, "array");
          type.checkType(item, newContext);
          error = undefined;
          break;
        } catch (e) {
          if (e instanceof TError) {
            error = e;
          } else {
            error = new TError({
              parent: this,
              value,
              context,
            });
          }
        }
      }
      if (error) {
        throw error;
      }
      i++;
    }
  }
}
