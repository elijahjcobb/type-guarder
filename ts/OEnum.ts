/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OEnum<T> extends OType<T> {

	private values: T[];

	private constructor(values: T[]) {

		super();
		this.values = values;

	}

	public conforms(value: any): boolean {

		return this.values.indexOf(value) !== -1;

	}

	public static any<T>(...values: T[]): OType<T> { return new OEnum(values); }

}