/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { T } from "..";

describe("TUnion", () => {
  it("should not allow undefined", () => {
    expect(
      T.union<string | number>(T.string(), T.number()).conforms(undefined)
    ).toEqual(false);
  });
  it("should not allow null", () => {
    expect(
      T.union<string | number>(T.string(), T.number()).conforms(null)
    ).toEqual(false);
  });
  it("should allow undefined", () => {
    expect(
      T.union<string | undefined>(T.string(), T.undefined()).conforms(undefined)
    ).toEqual(true);
  });
  it("should allow null", () => {
    expect(T.union<string | null>(T.string(), T.null()).conforms(null)).toEqual(
      true
    );
  });
  it("should allow number", () => {
    expect(
      T.union<string | number>(T.string(), T.number()).conforms(3)
    ).toEqual(true);
  });
  it("should not allow number", () => {
    expect(
      T.union<string | boolean>(T.string(), T.boolean()).conforms(3)
    ).toEqual(false);
  });
});
