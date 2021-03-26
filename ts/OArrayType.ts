/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OArrayType<T> extends OType<T> {

	protected readonly types: OType<T>[];

	protected constructor(types: OType<T>[]) {
		super();
		this.types = types;
	}

	public conforms(value: any, notEmpty: boolean = false): boolean {

		if (!Array.isArray(value)) return false;
		if (notEmpty && value.length === 0) return false;

		for (const subValue of value) {

			let follows: boolean = false;

			for (const type of this.types) {

				const conformity: boolean = type.conforms(subValue);

				if (conformity) {
					follows = true;
					break;
				}

			}

			if (!follows) return false;

		}

		return true;
	}

	public static any<T>(...types: OType<T>[]): OType<T> { return new OArrayType(types); }

}
