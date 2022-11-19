/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { T } from "../index";

describe("OOptional", (): void => {
  test("t1", (): void =>
    expect(T.optional(T.any()).conforms(undefined)).toBeTruthy());
  test("t2", (): void => expect(T.optional(T.any()).conforms(32)).toBeTruthy());
  test("t3", (): void =>
    expect(T.optional(T.string()).conforms(undefined)).toBeTruthy());
  test("t4", (): void =>
    expect(T.optional(T.string()).conforms("Hello, world!")).toBeTruthy());
  test("t5", (): void =>
    expect(T.optional(T.string()).conforms(42)).toBeFalsy());
});
