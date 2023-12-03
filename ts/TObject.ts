import { TAny } from "./TAny";
import { TArray } from "./TArray";
import { TType } from "./TType";
import { TContext } from "./context";
import { TError } from "./error";

export type TObjectTypeDefinition<T> = {
  [K in keyof T]: T[K] extends TType<any> ? T[K] : never;
};

export class TObject<T extends TObjectTypeDefinition<T>> extends TType<{
  [K in keyof T]: T[K] extends TType<infer V> ? V : never;
}> {
  protected readonly type: TObjectTypeDefinition<T>;

  public constructor(type: TObjectTypeDefinition<T>) {
    super();
    this.type = type;
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
  }
}
