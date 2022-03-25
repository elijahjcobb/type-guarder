/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TOptional} from "../TOptional";
import {TAny} from "../TAny";
import {TStandard} from "../TStandard";

describe("OOptional", (): void => {

	test("t1", (): void => expect(TOptional.maybe(TAny.any()).conforms(undefined)).toBeTruthy());
	test("t2", (): void => expect(TOptional.maybe(TAny.any()).conforms(32)).toBeTruthy());
	test("t3", (): void => expect(TOptional.maybe(TStandard.string).conforms(undefined)).toBeTruthy());
	test("t4", (): void => expect(TOptional.maybe(TStandard.string).conforms("Hello, world!")).toBeTruthy());
	test("t5", (): void => expect(TOptional.maybe(TStandard.string).conforms(42)).toBeFalsy());

});