/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OObjectTypeDefinition, TObject} from "../TObject";
import {TStandard} from "../TStandard";

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
				name: TStandard.string,
				age: TStandard.number
			},
			value: {
				name: "Elijah",
				age: 21
			},
			truthy: true
		},
		{
			expect: {
				name: TStandard.string,
				age: TStandard.number
			},
			value: {
				name: "Elijah",
				age: true
			},
			truthy: false
		},
		{
			expect: {
				name: TStandard.string,
				setting: TObject.follow({
					isDark: TStandard.boolean,
					notificationTime: TStandard.number
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
				name: TStandard.string,
				settings: TObject.follow({
					isDark: TStandard.boolean,
					notificationTime: TStandard.number
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
				name: TStandard.string,
				settings: TObject.follow({
					isDark: TStandard.boolean,
					notificationTime: TStandard.number
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
				name: TStandard.string,
				settings: TObject.follow({
					isDark: TStandard.boolean,
					notificationTime: TStandard.number
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
				x: TObject.follow({
					y: TObject.follow({
						z: TStandard.string
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
				x: TObject.follow({
					y: TObject.follow({
						z: TStandard.string
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
			expect(TObject.follow(t.expect).conforms(t.value)).toEqual(t.truthy);
		});
		i++;
	}

});