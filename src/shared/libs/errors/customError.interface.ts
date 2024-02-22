import { ILabel } from '../label/label.interface.js';
import { StatusCodes } from 'http-status-codes';

export interface ICustomError {
  readonly label: ILabel;
  code: StatusCodes;
}
