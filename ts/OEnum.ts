/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OEnum extends OType {

	private values: any[];

	private constructor(values: any[]) {

		super();
		this.values = values;

	}

	public conforms(value: any): boolean {

		return this.values.indexOf(value) !== -1;

	}

	public static any(...values: any[]): OType { return new OEnum(values); }

}