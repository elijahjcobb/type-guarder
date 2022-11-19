/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import { TType } from "../TType";
import { T } from "../index";

const values: any[] = ["", 42, true, null, undefined, {}, []];

function createTests<T>(truthyValue: any, type: TType<T>): void {
  for (const value of values) {
    const conforms: boolean = type.conforms(value);
    test(typeof value, (): void =>
      expect(conforms).toEqual(value === truthyValue)
    );
  }
}

describe("string", (): void => createTests("", T.string()));
describe("number", (): void => createTests(42, T.number()));
describe("boolean", (): void => createTests(true, T.boolean()));
describe("null", (): void => createTests(null, T.null()));
describe("undefined", (): void => createTests(undefined, T.undefined()));
