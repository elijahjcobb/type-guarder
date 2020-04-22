/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */


export abstract class OType {

	protected constructor() {}

	public abstract conforms(value: any): boolean;

	public verify<T>(value: any): T | undefined {

		if (!this.conforms(value)) return undefined;
		return value as unknown as T;

	}

}

export class OStandardType<T> extends OType {

	private readonly type: "string" | "number" | "boolean";

	public static readonly string: OStandardType<string> = new OStandardType("string");
	public static readonly number: OStandardType<number> = new OStandardType("number");
	public static readonly boolean: OStandardType<boolean> = new OStandardType("boolean");

	private constructor(type: "string" | "number" | "boolean") {
		super();
		this.type = type;
	}

	public conforms(value: any): boolean {

		return (typeof value) === this.type;

	}

}

export class OArrayType<T> extends OType {

	private readonly types: OType[];

	private constructor(types: OType[]) {
		super();
		this.types = types;
	}

	public conforms(value: any, notEmpty: boolean = false): boolean {

		if (!Array.isArray(value)) return false;
		if (notEmpty && value.length === 0) return false;

		for (const subValue of value) {

			let follows: boolean = false;

			for (const type of this.types) {

				const conformity: boolean = type.conforms(subValue);

				if (conformity) {
					follows = true;
					break;
				}

			}

			if (!follows) return false;

		}

		return true;
	}

	public static any<T>(...types: OType[]): OType { return new OArrayType(types); }

}

export interface OObjectTypeDefinition {
	[key: string]: OType;
}

export class OObjectType extends OType {

	private readonly type: OObjectTypeDefinition;

	private constructor(types: OObjectTypeDefinition) {
		super();
		this.type = types;
	}

	public conforms(value: any): boolean {

		if (typeof value !== "object") return false;

		let countedKeys: number = Object.keys(this.type).length;

		for (const k of Object.keys(value)) {

			const v: any = value[k];
			const expectedValue: OType | undefined = this.type[k];
			if (expectedValue === undefined) continue;
			const conformity: boolean = expectedValue.conforms(v);
			if (!conformity) return false;
			countedKeys--;

		}

		return countedKeys === 0;

	}

	public static follow(type: OObjectTypeDefinition): OType { return new OObjectType(type); }

}

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