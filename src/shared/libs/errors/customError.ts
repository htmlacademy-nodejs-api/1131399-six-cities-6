import { Label } from '../label/label.js';
import { ICustomError } from './customError.interface.js';
import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error implements ICustomError {
  readonly label;
  code;
  constructor(){
    super();
    this.label = new Label();
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
