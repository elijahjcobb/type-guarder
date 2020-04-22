/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {OType} from "./OType";

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

		for (const k of Object.keys(this.type)) {

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