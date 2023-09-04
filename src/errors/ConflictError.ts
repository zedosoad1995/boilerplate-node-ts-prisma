import { CustomError } from "./CustomError";
import _ from "lodash";

export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(public message: string, public errorCode?: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return _.omitBy({ message: this.message, error: this.errorCode }, _.isUndefined) as {
      message: string;
      errorCode?: string;
    };
  }
}
