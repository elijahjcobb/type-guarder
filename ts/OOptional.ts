/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OOptional<T> extends OType<T | undefined> {

	protected readonly type: OType<T>;

	protected constructor(type: OType<T>) {
		super();
		this.type = type;
	}

	public conforms(value: any): boolean {

		if (value === undefined) return true;
		return this.type.conforms(value);

	}

	public static maybe<T>(type: OType<T>): OType<T | undefined> { return new OOptional(type); }

}
