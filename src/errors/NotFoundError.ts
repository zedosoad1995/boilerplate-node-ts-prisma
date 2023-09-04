import { CustomError } from "./CustomError";
import _ from "lodash";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string = "Not Found", public errorCode?: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return _.omitBy({ message: this.message, error: this.errorCode }, _.isUndefined) as {
      message: string;
      errorCode?: string;
    };
  }
}
