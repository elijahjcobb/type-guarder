import { TType } from "./TType";
import { TContext } from "./context";

export class TAny extends TType<any> {
  public readableName(): string {
    return "any";
  }
  public checkType(value: any, context?: TContext | undefined): void {}
}
