/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OUnion<T> extends OType<T> {

	protected readonly types: OType<T>[];

	protected constructor(types: OType<T>[]) {
		super();
		this.types = types;
	}

	public conforms(value: any): boolean {

		for (const type of this.types) {

			const conformity: boolean = type.conforms(value);
			if (conformity) return true;

		}

		return false;

	}

	public static any<T>(...types: OType<T>[]): OType<T> { return new OUnion(types); }

}
