/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OOptional extends OType {

	private readonly type: OType;

	private constructor(type: OType) {
		super();
		this.type = type;
	}

	public conforms(value: any): boolean {

		if (value === undefined) return true;
		return this.type.conforms(value);

	}

	public static maybe(type: OType): OType { return new OOptional(type); }

}