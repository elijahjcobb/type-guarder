export type ContextItemType = "array" | "object";

export interface ContextItem {
  value: string;
  type: ContextItemType;
}

export class TContext {
  protected readonly trace: ContextItem[] = [];

  protected clone(): TContext {
    const context = new TContext();
    context.trace.push(...this.trace);
    return context;
  }

  public addTrace(value: string, type: ContextItemType): TContext {
    const context = this.clone();
    context.trace.push({ value, type });
    return context;
  }

  public getTrace(): string {
    return this.toString();
  }

  public toString(): string {
    let str = "";
    let i = 0;
    for (const item of this.trace) {
      if (i === 0) {
        str += item.value;
      } else {
        if (item.type === "array") {
          str += `[${item.value}]`;
        } else if (item.type === "object") {
          str += `.${item.value}`;
        }
      }
      i++;
    }
    return str;
  }
}
