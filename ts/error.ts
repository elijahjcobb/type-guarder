import { TType } from "./TType";
import { TContext } from "./context";

export class TError<T> extends Error {
  public expectedType: string;
  public actualType: string;
  public readonly parentType: TType<T>;
  public readonly location?: string;
  public readonly value: any;

  public constructor({
    value,
    context,
    parent,
  }: {
    parent: TType<T>;
    value: any;
    context?: TContext;
  }) {
    const location = context && context.getTrace();
    const type = typeof value;
    super();
    this.expectedType = parent.readableName();
    this.actualType = type;
    this.name = "TError";
    this.parentType = parent;
    this.location = location;
    this.value = value;
    this.message = `The type of \`${JSON.stringify(value)}\`${
      location ? ` at \`${location}\`` : ""
    } is \`${type}\` and it should be \`${parent.readableName()}\`.`;
  }
}

export class TErrorRegex<T> extends TError<T> {
  public constructor(config: {
    parent: TType<T>;
    value: any;
    context?: TContext;
  }) {
    super(config);
    const location = config.context && config.context.getTrace();
    this.message = `The string \`${JSON.stringify(config.value)}\`${
      location ? ` at \`${location}\`` : ""
    } does not match the regular expression \`${config.parent.readableName()}\`.`;
  }
}

export enum RangeBound {
  MIN,
  MAX,
}

export class TErrorStringLength<T> extends TError<T> {
  public constructor(
    bound: number,
    type: RangeBound,
    config: {
      parent: TType<T>;
      value: any;
      context?: TContext;
    }
  ) {
    super(config);
    const location = config.context && config.context.getTrace();
    this.message = `The string \`${JSON.stringify(config.value)}\`${
      location ? ` at \`${location}\`` : ""
    } is ${config.value.length} chars and it should be ${
      type === RangeBound.MIN ? "at least" : "less than"
    } ${bound} chars.`;
  }
}

export class TErrorNumber<T> extends TError<T> {
  public constructor(
    bound: number,
    type: RangeBound,
    config: {
      parent: TType<T>;
      value: any;
      context?: TContext;
    }
  ) {
    super(config);
    const location = config.context && config.context.getTrace();
    this.message = `The number \`${JSON.stringify(config.value)}\`${
      location ? ` at \`${location}\`` : ""
    } must be ${
      type === RangeBound.MIN ? "greater" : "less"
    } than or equal to ${bound}.`;
  }
}

export class TErrorArrayLength<T> extends TError<T> {
  public constructor(
    bound: number,
    type: RangeBound,
    config: {
      parent: TType<T>;
      value: any;
      context?: TContext;
    }
  ) {
    super(config);
    const location = config.context && config.context.getTrace();
    this.message = `The array \`${JSON.stringify(config.value)}\`${
      location ? ` at \`${location}\`` : ""
    } has ${config.value.length} elements and it should have ${
      type === RangeBound.MIN ? "at least" : "no more than"
    } ${bound} elements.`;
  }
}
