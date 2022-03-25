/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TType} from "./TType";

export class TAny extends TType<any> {


	protected constructor() {

		super();

	}

	public conforms(value: any): boolean {

		return true;

	}

	public static any(): TType<any> { return new TAny(); }

}
