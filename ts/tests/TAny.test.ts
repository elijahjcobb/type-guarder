/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TAny} from "../TAny";

describe("OAny", (): void => {

	test("Boolean", (): void => expect(TAny.any().conforms(true)).toBeTruthy());
	test("String", (): void => expect(TAny.any().conforms("Hello, world!")).toBeTruthy());
	test("Number", (): void => expect(TAny.any().conforms(42)).toBeTruthy());
	test("Array", (): void => expect(TAny.any().conforms([])).toBeTruthy());
	test("Object", (): void => expect(TAny.any().conforms({})).toBeTruthy());
	test("Undefined", (): void => expect(TAny.any().conforms(undefined)).toBeTruthy());

});