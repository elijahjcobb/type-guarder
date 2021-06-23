import {OAny, OArrayType, OObjectType, OObjectTypeDefinition, OOptional, OStandardType, OType} from "../index";
import {ORegex} from "../ORegex";

describe("Integration of OObject and OArray", () => {

	const x: unknown = {};
	const y: unknown = {a: ["Hello"], b: [{name: "Elijah", age: 22}]};

	const o = OObjectType.follow({
		a: OArrayType.any(OStandardType.string),
		b: OArrayType.any(OObjectType.follow({
			name: OStandardType.string,
			age: OStandardType.number
		}))
	});

	const a = o.verify(x);
	const b = o.verify(y);

	if (b) {
		for (const fwe of b.b) {
			fwe.name
		}
	}

	expect(a).toBeUndefined();
	expect(b).toBeDefined();

});

describe("OStandardType", (): void => {

	const values: any[] = [
		"",
		42,
		true,
		null,
		undefined,
		{},
		[]
	];

	function createTests<T>(truthyValue: any, type: OType<T>): void {
		for (const value of values) {
			const conforms: boolean = type.conforms(value);
			test(typeof value, (): void => expect(conforms).toEqual(value === truthyValue));
		}
	}

	describe("string", (): void => createTests("", OStandardType.string));
	describe("number", (): void => createTests(42, OStandardType.number));
	describe("boolean", (): void => createTests(true, OStandardType. boolean));
	describe("null", (): void => createTests(null, OStandardType.null));
	describe("undefined", (): void => createTests(undefined, OStandardType.undefined));

});

describe("OArrayType", (): void => {


	const values: Map<any, OType<any>> = new Map();

	values.set("", OStandardType.string);
	values.set(42, OStandardType.number);
	values.set(true, OStandardType.boolean);
	values.set(null, OStandardType.null);
	values.set(undefined, OStandardType.undefined);

	function createTests(): void {
		for (const [k1, v1] of values) {
			describe(typeof k1, (): void => {
				for (const [k2, v2] of values) {
					if (k2 === k1) continue;
					describe(typeof k2, (): void => {
						for (const [k3, v3] of values) {
							if (k3 === k1) continue;
							if (k3 === k2) continue;
							describe(typeof k3, (): void => {
								for (const [k4, v4] of values) {
									if (k4 === k1) continue;
									if (k4 === k2) continue;
									if (k4 === k3) continue;
									describe(typeof k4, (): void => {
										for (const [k5, v5] of values) {
											if (k5 === k1) continue;
											if (k5 === k2) continue;
											if (k5 === k3) continue;
											if (k5 === k4) continue;
											describe(typeof k5, (): void => {
												test(typeof k1, (): void => expect(v1.conforms(k1)).toBeTruthy());
												test(typeof k2, (): void => expect(v2.conforms(k1)).toBeFalsy());
												test(typeof k3, (): void => expect(v3.conforms(k1)).toBeFalsy());
												test(typeof k4, (): void => expect(v4.conforms(k1)).toBeFalsy());
												test(typeof k5, (): void => expect(v5.conforms(k1)).toBeFalsy());
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	}

	createTests();

});

describe("OObjectType", (): void => {

	const tests: {expect: OObjectTypeDefinition<any>, value: any, truthy: boolean}[] = [
		{
			expect: {

			},
			value: {

			},
			truthy: true
		},
		{
			expect: {
				name: OStandardType.string,
				age: OStandardType.number
			},
			value: {
				name: "Elijah",
				age: 21
			},
			truthy: true
		},
		{
			expect: {
				name: OStandardType.string,
				age: OStandardType.number
			},
			value: {
				name: "Elijah",
				age: true
			},
			truthy: false
		},
		{
			expect: {
				name: OStandardType.string,
				setting: OObjectType.follow({
					isDark: OStandardType.boolean,
					notificationTime: OStandardType.number
				})
			},
			value: {
				name: "Elijah",
				setting: {
					isDark: true,
					notificationTime: 2332
				}
			},
			truthy: true
		},
		{
			expect: {
				name: OStandardType.string,
				settings: OObjectType.follow({
					isDark: OStandardType.boolean,
					notificationTime: OStandardType.number
				})
			},
			value: {
				name: "Elijah",
				setting: true
			},
			truthy: false
		},
		{
			expect: {
				name: OStandardType.string,
				settings: OObjectType.follow({
					isDark: OStandardType.boolean,
					notificationTime: OStandardType.number
				})
			},
			value: {
				name: "Elijah",
				setting: {
					isDark: true,
					notificationTime: "2332"
				}
			},
			truthy: false
		},
		{
			expect: {
				name: OStandardType.string,
				settings: OObjectType.follow({
					isDark: OStandardType.boolean,
					notificationTime: OStandardType.number
				})
			},
			value: {
				name: "Elijah",
				setting: {
					isDark: 32,
					notificationTime: 2332
				}
			},
			truthy: false
		},
		{
			expect: {
				x: OObjectType.follow({
					y: OObjectType.follow({
						z: OStandardType.string
					})
				})
			},
			value: {
				x: {
					y: {
						z: "Hello, world!"
					}
				}
			},
			truthy: true
		},
		{
			expect: {
				x: OObjectType.follow({
					y: OObjectType.follow({
						z: OStandardType.string
					})
				})
			},
			value: {
				x: {
					y: {},
					z: "Hello, world!"
				}
			},
			truthy: false
		}
	];

	let i: number = 0;
	for (const t of tests) {
		test("Test " + i, (): void => {
			expect(OObjectType.follow(t.expect).conforms(t.value)).toEqual(t.truthy);
		});
		i++;
	}

});

describe("OAny", (): void => {

	test("Boolean", (): void => expect(OAny.any().conforms(true)).toBeTruthy());
	test("String", (): void => expect(OAny.any().conforms("Hello, world!")).toBeTruthy());
	test("Number", (): void => expect(OAny.any().conforms(42)).toBeTruthy());
	test("Array", (): void => expect(OAny.any().conforms([])).toBeTruthy());
	test("Object", (): void => expect(OAny.any().conforms({})).toBeTruthy());
	test("Undefined", (): void => expect(OAny.any().conforms(undefined)).toBeTruthy());

});

describe("OOptional", (): void => {

	test("t1", (): void => expect(OOptional.maybe(OAny.any()).conforms(undefined)).toBeTruthy());
	test("t2", (): void => expect(OOptional.maybe(OAny.any()).conforms(32)).toBeTruthy());
	test("t3", (): void => expect(OOptional.maybe(OStandardType.string).conforms(undefined)).toBeTruthy());
	test("t4", (): void => expect(OOptional.maybe(OStandardType.string).conforms("Hello, world!")).toBeTruthy());
	test("t5", (): void => expect(OOptional.maybe(OStandardType.string).conforms(42)).toBeFalsy());

});

describe("ORegex", (): void => {

	describe("Email", (): void => {

		test("t1", (): void => expect(ORegex.email().conforms("john@gmail.com")).toBeTruthy());
		test("t2", (): void => expect(ORegex.email().conforms("")).toBeFalsy());
		test("t3", (): void => expect(ORegex.email().conforms("@gmail.com")).toBeFalsy());
		test("t4", (): void => expect(ORegex.email().conforms("@gmail")).toBeFalsy());
		test("t5", (): void => expect(ORegex.email().conforms("john@")).toBeFalsy());
		test("t6", (): void => expect(ORegex.email().conforms("john@.com")).toBeFalsy());
		test("t7", (): void => expect(ORegex.email().conforms("@gmail.com")).toBeFalsy());
		test("t8", (): void => expect(ORegex.email().conforms("john@.com")).toBeFalsy());
		test("t9", (): void => expect(ORegex.email().conforms("@.com")).toBeFalsy());

	});

	describe("Domain", (): void => {

		test("t1", (): void => expect(ORegex.domain().conforms("gmail.com")).toBeTruthy());
		test("t2", (): void => expect(ORegex.domain().conforms("a.b.c.com")).toBeTruthy());
		test("t3", (): void => expect(ORegex.domain().conforms("mail.google.com")).toBeTruthy());
		test("t4", (): void => expect(ORegex.domain().conforms(".com")).toBeFalsy());
		test("t5", (): void => expect(ORegex.domain().conforms("google")).toBeFalsy());
		test("t6", (): void => expect(ORegex.domain().conforms("google.")).toBeFalsy());

	});

	describe("URL", (): void => {

		test("t1", (): void => expect(ORegex.url().conforms("http://gmail.com")).toBeTruthy());
		test("t2", (): void => expect(ORegex.url().conforms("https://gmail.com")).toBeTruthy());
		test("t3", (): void => expect(ORegex.url().conforms("http://gmail.com/hi")).toBeTruthy());
		test("t4", (): void => expect(ORegex.url().conforms("gmail.com")).toBeTruthy());
		test("t5", (): void => expect(ORegex.url().conforms("a.b.c.com")).toBeTruthy());
		test("t6", (): void => expect(ORegex.url().conforms("mail.google.com")).toBeTruthy());
		test("t7", (): void => expect(ORegex.url().conforms(".com")).toBeFalsy());
		test("t8", (): void => expect(ORegex.url().conforms("google")).toBeFalsy());
		test("t9", (): void => expect(ORegex.url().conforms("google.")).toBeFalsy());

	});

	describe("Phone", (): void => {

		test("t1", (): void => expect(ORegex.phone().conforms("+1 (123) 456 - 7890")).toBeTruthy());
		test("t2", (): void => expect(ORegex.phone().conforms("+1 (123) 456 -7890")).toBeTruthy());
		test("t3", (): void => expect(ORegex.phone().conforms("+1 (123) 456- 7890")).toBeTruthy());
		test("t4", (): void => expect(ORegex.phone().conforms("+1 (123) 456-7890")).toBeTruthy());
		test("t5", (): void => expect(ORegex.phone().conforms("+1 (123)456-7890")).toBeTruthy());
		test("t6", (): void => expect(ORegex.phone().conforms("+11234567890")).toBeTruthy());
		test("t7", (): void => expect(ORegex.phone().conforms("+1 123 456 - 7890")).toBeTruthy());
		test("t8", (): void => expect(ORegex.phone().conforms("2112")).toBeFalsy());
		test("t9", (): void => expect(ORegex.phone().conforms("123467890a")).toBeFalsy());
		test("t0", (): void => expect(ORegex.phone().conforms("+a1")).toBeFalsy());
		test("t10", (): void => expect(ORegex.phone().conforms("1a1")).toBeFalsy());

	});

});