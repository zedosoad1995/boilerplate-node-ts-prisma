import { CustomError } from "./CustomError";
import _ from "lodash";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string = "Bad Request", public errorCode?: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return _.omitBy({ message: this.message, error: this.errorCode }, _.isUndefined) as {
      message: string;
      errorCode?: string;
    };
  }
}
