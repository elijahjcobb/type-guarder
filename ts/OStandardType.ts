/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

export class OStandardType extends OType {

	private readonly type: "string" | "number" | "boolean" | "null" | "void" | "undefined";

	public static readonly string: OStandardType = new OStandardType("string");
	public static readonly number: OStandardType = new OStandardType("number");
	public static readonly boolean: OStandardType = new OStandardType("boolean");
	public static readonly void: OStandardType = new OStandardType("void");
	public static readonly null: OStandardType = new OStandardType("null");
	public static readonly undefined: OStandardType = new OStandardType("undefined");

	private constructor(type: "string" | "number" | "boolean" | "null" | "void" | "undefined") {
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