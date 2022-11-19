/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { T } from "..";

describe("TEnum", () => {
  it("should allow 4", () => {
    expect(T.enum<4 | 23>(4, 23).conforms(4)).toEqual(true);
  });
  test("should not allow 5", () => {
    expect(T.enum<4 | 23>(4, 23).conforms(5)).toEqual(false);
  });
});
