/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OUnion extends OType {

	private readonly types: OType[];

	private constructor(types: OType[]) {
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

	public static any(...types: OType[]): OType { return new OUnion(types); }

}