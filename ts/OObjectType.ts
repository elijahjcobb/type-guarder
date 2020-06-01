/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export type OObjectTypeDefinition<T> = {
	[K in keyof T]: OType<any>;
};

export class OObjectType<T extends {[K in keyof T]: V extends OType<infer V> ? V : never}, V> extends OType<T> {

	private readonly type: OObjectTypeDefinition<T>;

	private constructor(types: OObjectTypeDefinition<T>) {
		super();
		this.type = types;
	}

	public conforms(value: any): boolean {

		if (typeof value !== "object") return false;

		let countedKeys: number = Object.keys(this.type).length;

		for (const k in this.type) {

			const v: any = value[k];
			const expectedValue: OType<T> | undefined = this.type[k];
			if (expectedValue === undefined) continue;
			const conformity: boolean = expectedValue.conforms(v);
			if (!conformity) return false;
			countedKeys--;

		}

		return countedKeys === 0;

	}

	public static follow<T>(type: OObjectTypeDefinition<T>): OType<T> { return new OObjectType(type); }

}