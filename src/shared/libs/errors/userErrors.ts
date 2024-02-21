import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class CreateUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.createUser');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class GetUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.getUser');
    this.code = StatusCodes.NOT_FOUND;
  }
}
