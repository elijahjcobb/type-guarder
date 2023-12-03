import { TNull } from "./TNull";
import { TType } from "./TType";
import { TUndefined } from "./TUndefined";
import { TUnion } from "./TUnion";
import { TContext } from "./context";

export class TOptional<T> extends TUnion<[TType<T>, TNull, TUndefined]> {
  private readonly subtype: TType<T>;

  public constructor(subtype: TType<T>) {
    super(subtype, new TNull(), new TUndefined());
    this.subtype = subtype;
  }

  public readableName(): string {
    return `${this.subtype.readableName()} | null | undefined`;
  }
  public checkType(value: any, context: TContext): void {
    if (value === null) return;
    if (value === undefined) return;
    this.subtype.checkType(value, context);
  }
}
