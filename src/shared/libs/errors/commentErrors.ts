import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class CreateCommentError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.user.createComment');
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class CommentIdValidationError extends CustomError {
  constructor() {
    super();
    this.message = this.label.get('error.comment.idInvalid');
    this.code = StatusCodes.NOT_ACCEPTABLE;
  }
}
