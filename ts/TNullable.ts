import { TNull } from "./TNull";
import { TType } from "./TType";
import { TUnion } from "./TUnion";

export class TNullable<T extends TType<any>> extends TUnion<[T, TNull]> {
  private readonly subtype: T;

  public constructor(subtype: T) {
    super(subtype, new TNull());
    this.subtype = subtype;
  }

  public readableName(): string {
    return `${this.subtype.readableName()} | null`;
  }
}
