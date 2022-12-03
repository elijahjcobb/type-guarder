import { TAny } from "./TAny";
import { TArray } from "./TArray";
import { TObject } from "./TObject";
import { TOptional } from "./TOptional";
import { TRegex } from "./TRegex";
import { TStandard } from "./TStandard";
import { TUnion } from "./TUnion";
import { TEnum } from "./TEnum";

export { TType } from "./TType";

export const T = {
  string: () => TStandard.string,
  boolean: () => TStandard.boolean,
  null: () => TStandard.null,
  number: () => TStandard.number,
  void: () => TStandard.void,
  undefined: () => TStandard.undefined,
  array: TArray.any,
  enum: TEnum.any,
  any: TAny.any,
  object: TObject.follow,
  optional: TOptional.maybe,
  regex: {
    custom: TRegex.custom,
    domain: TRegex.domain,
    email: TRegex.email,
    phone: TRegex.phone,
    url: TRegex.url,
  },
  union: TUnion.any,
};
