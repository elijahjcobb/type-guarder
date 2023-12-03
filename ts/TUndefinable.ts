import { TType } from "./TType";
import { TUndefined } from "./TUndefined";
import { TUnion } from "./TUnion";

export class TUndefinable<T extends TType<any>> extends TUnion<
  [T, TUndefined]
> {
  private readonly subtype: T;

  public constructor(subtype: T) {
    super(subtype, new TUndefined());
    this.subtype = subtype;
  }

  public readableName(): string {
    return `${this.subtype.readableName()} | undefined`;
  }
}
