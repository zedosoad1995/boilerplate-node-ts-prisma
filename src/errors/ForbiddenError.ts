import { CustomError } from "./CustomError";
import _ from "lodash";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(public message: string = "Forbidden", public errorCode?: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return _.omitBy({ message: this.message, error: this.errorCode }, _.isUndefined) as {
      message: string;
      errorCode?: string;
    };
  }
}
