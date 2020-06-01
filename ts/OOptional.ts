/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OOptional<T> extends OType<T | undefined> {

	private readonly type: OType<T>;

	private constructor(type: OType<T>) {
		super();
		this.type = type;
	}

	public conforms(value: any): boolean {

		if (value === undefined) return true;
		return this.type.conforms(value);

	}

	public static maybe<T>(type: OType<T>): OType<T | undefined> { return new OOptional(type); }

}