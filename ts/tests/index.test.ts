import {OArrayType, OObjectType, OObjectTypeDefinition, OStandardType, OType} from "../index";

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

	function createTests(truthyValue: any, type: OType): void {
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


	const values: Map<any, OType> = new Map();

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

	const tests: {expect: OObjectTypeDefinition, value: any, truthy: boolean}[] = [
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