/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { T } from "../index";

describe("OAny", (): void => {
  const t: Map<string, any> = new Map<string, any>();

  t.set("Function", () => {});
  t.set("Boolean True", true);
  t.set("Boolean False", false);
  t.set("String - Empty", "");
  t.set("String - N", "\n");
  t.set("String - S", " ");
  t.set("String - G", "Hello, world!");
  t.set("NaN", Number.NaN);
  t.set("+Infty", Number.POSITIVE_INFINITY);
  t.set("-Infty", Number.NEGATIVE_INFINITY);
  t.set("0", 0);
  t.set("Pi", Math.PI);
  t.set("Number", 42);
  t.set("Array - Empty", []);
  t.set("Array", [() => {}, true]);
  t.set("Undefined", undefined);
  t.set("Null", null);
  t.set("Object", {});
  t.set("Map", new Map());

  for (const [name, value] of t.entries()) {
    test(name, () => expect(T.any().conforms(value)).toBeTruthy());
  }
});
