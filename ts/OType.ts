/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

export abstract class OType<T> {

	protected constructor() {}

	public abstract conforms(value: any): boolean;

	public verify(value: any): T | undefined {

		if (!this.conforms(value)) return undefined;
		return value as unknown as T;

	}

}