import { TAny } from "./TAny";
import { TArray } from "./TArray";
import { TType } from "./TType";
import { TContext } from "./context";
import { TError, TErrorObjectInjection } from "./error";

export type TObjectTypeDefinition<T> = {
  [K in keyof T]: T[K] extends TType<any> ? T[K] : never;
};

export interface TObjectOptions {
  injective?: boolean;
}

export class TObject<T extends TObjectTypeDefinition<T>> extends TType<{
  [K in keyof T]: T[K] extends TType<infer V> ? V : never;
}> {
  protected readonly type: TObjectTypeDefinition<T>;
  protected readonly options?: TObjectOptions;

  public constructor(type: TObjectTypeDefinition<T>, options?: TObjectOptions) {
    super();
    this.type = type;
    this.options = options;
  }

  public readableName(): string {
    const value: string[] = [];

    for (const k in this.type) {
      const v: TType<any> = this.type[k];
      value.push(`${k}: ${v.readableName()}`);
    }

    return `{ ${value.join(", ")} }`;
  }

  public checkType(value: any, context: TContext): void {
    if (typeof value !== "object")
      throw new TError({
        value,
        context,
        parent: this,
      });

    if (Array.isArray(value))
      throw new TError({
        value,
        context,
        parent: this,
      });

    for (const [k, t] of Object.entries(this.type)) {
      const v = value[k];
      const type = t as TType<any>;
      const newContext = context.addTrace(k, "object");
      type.checkType(v, newContext);
    }

    if (this.options?.injective) {
      const keys = Object.keys(value);
      const actualLength = keys.length;
      const expectedLength = Object.keys(this.type).length;
      if (actualLength !== expectedLength)
        throw new TErrorObjectInjection(expectedLength, actualLength, {
          value,
          context,
          parent: this,
        });
    }
  }
}
