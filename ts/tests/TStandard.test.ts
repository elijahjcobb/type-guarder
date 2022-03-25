/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import {TType} from "../TType";
import {TStandard} from "../TStandard";

const values: any[] = [
	"",
	42,
	true,
	null,
	undefined,
	{},
	[]
];

function createTests<T>(truthyValue: any, type: TType<T>): void {
	for (const value of values) {
		const conforms: boolean = type.conforms(value);
		test(typeof value, (): void => expect(conforms).toEqual(value === truthyValue));
	}
}

describe("string", (): void => createTests("", TStandard.string));
describe("number", (): void => createTests(42, TStandard.number));
describe("boolean", (): void => createTests(true, TStandard. boolean));
describe("null", (): void => createTests(null, TStandard.null));
describe("undefined", (): void => createTests(undefined, TStandard.undefined));