import { TAny } from "./TAny";
import { TArray } from "./TArray";
import { TBoolean } from "./TBoolean";
import { TNull } from "./TNull";
import { TNullable } from "./TNullable";
import { TFloat, TInteger, TNumber } from "./TNumber";
import { TObject } from "./TObject";
import { TOptional } from "./TOptional";
import { TRegex } from "./TRegex";
import { TString } from "./TString";
import { TType } from "./TType";
import { TUndefinable } from "./TUndefinable";
import { TUndefined } from "./TUndefined";
import { TUnion } from "./TUnion";
import { TValue } from "./TValue";

export const T = {
  Any: (...args: ConstructorParameters<typeof TAny>) => new TAny(...args),
  Array: <T extends TType<any>[]>(...types: T) => new TArray({ types }),
  ArrayWithOptions: (...args: ConstructorParameters<typeof TArray>) =>
    new TArray(...args),
  Boolean: (...args: ConstructorParameters<typeof TBoolean>) =>
    new TBoolean(...args),
  Null: (...args: ConstructorParameters<typeof TNull>) => new TNull(...args),
  Nullable: (...args: ConstructorParameters<typeof TNullable>) =>
    new TNullable(...args),
  Object: (...args: ConstructorParameters<typeof TObject>) =>
    new TObject(...args),
  Optional: (...args: ConstructorParameters<typeof TOptional>) =>
    new TOptional(...args),
  Regex: (...args: ConstructorParameters<typeof TRegex>) => new TRegex(...args),
  String: (...args: ConstructorParameters<typeof TString>) =>
    new TString(...args),
  Number: (...args: ConstructorParameters<typeof TNumber>) =>
    new TNumber(...args),
  Integer: (...args: ConstructorParameters<typeof TInteger>) =>
    new TInteger(...args),
  Float: (...args: ConstructorParameters<typeof TFloat>) => new TFloat(...args),
  Undefinable: (...args: ConstructorParameters<typeof TUndefinable>) =>
    new TUndefinable(...args),
  Undefined: (...args: ConstructorParameters<typeof TUndefined>) =>
    new TUndefined(...args),
  Value: (...args: ConstructorParameters<typeof TValue>) => new TValue(...args),
  Union: (...args: ConstructorParameters<typeof TUnion>) => new TUnion(...args),
};

export * from "./error";
export type { TObjectTypeDefinition, TObjectOptions } from "./TObject";
