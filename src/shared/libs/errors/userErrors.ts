import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class CreateUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.createUser');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class GetUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.getUser');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetUserByEmailError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.getUserByEmail');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetUserByIdError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.getUserById');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetSelectedFieldOnUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.getSelectedFieldOnUser');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class UpdateUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.updateUserById');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class GetSelectedOffersOnUserError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.getSelectedOffersOnUser');
    this.code = StatusCodes.NOT_FOUND;
  }
}

export class UserIdValidationError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.idInvalid');
    this.code = StatusCodes.NOT_ACCEPTABLE;
  }
}
