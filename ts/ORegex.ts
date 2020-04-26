/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";
import {OStandardType} from "./OStandardType";

export class ORegex extends OType {

	private expression: RegExp;

	private constructor(expression: RegExp) {

		super();

		this.expression = expression;

	}

	public conforms(value: any): boolean {

		if (!OStandardType.string.conforms(value)) return false;
		return this.expression.test(value);

	}

	public static custom(expression: RegExp): OType {
		return new ORegex(expression);
	}

	public static email(): OType {
		return new ORegex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
	}

	public static domain(): OType {
		return new ORegex(/([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g);
	}

	public static url(): OType {
		return new ORegex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
	}

	public static phone(): OType {
		return new ORegex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm);
	}

}