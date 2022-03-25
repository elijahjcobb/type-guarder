/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {TType} from "./TType";

export class TStandard<T> extends TType<T> {

	protected readonly type: "string" | "number" | "boolean" | "null" | "void" | "undefined";

	public static readonly string: TStandard<string> = new TStandard("string");
	public static readonly number: TStandard<number> = new TStandard("number");
	public static readonly boolean: TStandard<boolean> = new TStandard("boolean");
	public static readonly void: TStandard<void> = new TStandard("void");
	public static readonly null: TStandard<null> = new TStandard("null");
	public static readonly undefined: TStandard<undefined> = new TStandard("undefined");

	protected constructor(type: "string" | "number" | "boolean" | "null" | "void" | "undefined") {
		super();
		this.type = type;
	}

	public conforms(value: any): boolean {

		if (this.type === "void") return false;
		if (this.type === "null") return value === null;
		if (this.type === "undefined") return value === undefined;
		return (typeof value) === this.type;

	}

}
