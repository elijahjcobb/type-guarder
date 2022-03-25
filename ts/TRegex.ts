/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TType} from "./TType";
import {TStandard} from "./TStandard";

export class TRegex extends TType<string> {

	protected expression: RegExp;

	protected constructor(expression: RegExp) {

		super();

		this.expression = expression;

	}

	public conforms(value: any): boolean {

		if (!TStandard.string.conforms(value)) return false;
		return this.expression.test(value);

	}

	public static custom(expression: RegExp): TType<string> {
		return new TRegex(expression);
	}

	public static email(): TType<string> {
		return new TRegex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
	}

	public static domain(): TType<string> {
		return new TRegex(/([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g);
	}

	public static url(): TType<string> {
		return new TRegex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
	}

	public static phone(): TType<string> {
		return new TRegex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm);
	}

}
