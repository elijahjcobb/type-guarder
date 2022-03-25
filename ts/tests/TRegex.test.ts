/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TRegex} from "../TRegex";

describe("ORegex", (): void => {

	describe("Email", (): void => {

		test("t1", (): void => expect(TRegex.email().conforms("john@gmail.com")).toBeTruthy());
		test("t2", (): void => expect(TRegex.email().conforms("")).toBeFalsy());
		test("t3", (): void => expect(TRegex.email().conforms("@gmail.com")).toBeFalsy());
		test("t4", (): void => expect(TRegex.email().conforms("@gmail")).toBeFalsy());
		test("t5", (): void => expect(TRegex.email().conforms("john@")).toBeFalsy());
		test("t6", (): void => expect(TRegex.email().conforms("john@.com")).toBeFalsy());
		test("t7", (): void => expect(TRegex.email().conforms("@gmail.com")).toBeFalsy());
		test("t8", (): void => expect(TRegex.email().conforms("john@.com")).toBeFalsy());
		test("t9", (): void => expect(TRegex.email().conforms("@.com")).toBeFalsy());

	});

	describe("Domain", (): void => {

		test("t1", (): void => expect(TRegex.domain().conforms("gmail.com")).toBeTruthy());
		test("t2", (): void => expect(TRegex.domain().conforms("a.b.c.com")).toBeTruthy());
		test("t3", (): void => expect(TRegex.domain().conforms("mail.google.com")).toBeTruthy());
		test("t4", (): void => expect(TRegex.domain().conforms(".com")).toBeFalsy());
		test("t5", (): void => expect(TRegex.domain().conforms("google")).toBeFalsy());
		test("t6", (): void => expect(TRegex.domain().conforms("google.")).toBeFalsy());

	});

	describe("URL", (): void => {

		test("t1", (): void => expect(TRegex.url().conforms("http://gmail.com")).toBeTruthy());
		test("t2", (): void => expect(TRegex.url().conforms("https://gmail.com")).toBeTruthy());
		test("t3", (): void => expect(TRegex.url().conforms("http://gmail.com/hi")).toBeTruthy());
		test("t4", (): void => expect(TRegex.url().conforms("gmail.com")).toBeTruthy());
		test("t5", (): void => expect(TRegex.url().conforms("a.b.c.com")).toBeTruthy());
		test("t6", (): void => expect(TRegex.url().conforms("mail.google.com")).toBeTruthy());
		test("t7", (): void => expect(TRegex.url().conforms(".com")).toBeFalsy());
		test("t8", (): void => expect(TRegex.url().conforms("google")).toBeFalsy());
		test("t9", (): void => expect(TRegex.url().conforms("google.")).toBeFalsy());

	});

	describe("Phone", (): void => {

		test("t1", (): void => expect(TRegex.phone().conforms("+1 (123) 456 - 7890")).toBeTruthy());
		test("t2", (): void => expect(TRegex.phone().conforms("+1 (123) 456 -7890")).toBeTruthy());
		test("t3", (): void => expect(TRegex.phone().conforms("+1 (123) 456- 7890")).toBeTruthy());
		test("t4", (): void => expect(TRegex.phone().conforms("+1 (123) 456-7890")).toBeTruthy());
		test("t5", (): void => expect(TRegex.phone().conforms("+1 (123)456-7890")).toBeTruthy());
		test("t6", (): void => expect(TRegex.phone().conforms("+11234567890")).toBeTruthy());
		test("t7", (): void => expect(TRegex.phone().conforms("+1 123 456 - 7890")).toBeTruthy());
		test("t8", (): void => expect(TRegex.phone().conforms("2112")).toBeFalsy());
		test("t9", (): void => expect(TRegex.phone().conforms("123467890a")).toBeFalsy());
		test("t0", (): void => expect(TRegex.phone().conforms("+a1")).toBeFalsy());
		test("t10", (): void => expect(TRegex.phone().conforms("1a1")).toBeFalsy());

	});

});