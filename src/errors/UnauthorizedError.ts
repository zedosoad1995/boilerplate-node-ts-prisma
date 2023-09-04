import { CustomError } from "./CustomError";
import _ from "lodash";

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string = "Unauthorized", public errorCode?: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return _.omitBy({ message: this.message, error: this.errorCode }, _.isUndefined) as {
      message: string;
      errorCode?: string;
    };
  }
}
