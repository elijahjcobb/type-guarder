/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OAny extends OType<any> {


	protected constructor() {

		super();

	}

	public conforms(value: any): boolean {

		return true;

	}

	public static any(): OType<any> { return new OAny(); }

}
