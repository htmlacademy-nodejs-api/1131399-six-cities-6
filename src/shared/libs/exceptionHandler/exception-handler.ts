import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IBaseExceptionHandler } from './exception-handler.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';
import { CustomError } from '../errors/customError.js';


@injectable()
export class BaseExceptionHandler implements IBaseExceptionHandler {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ){
    this.logger.info('BaseExceptionHandler register');
  }

  catch(error: CustomError, _request: Request, response: Response, _next: NextFunction): void {
    this.logger.error(error.message, {} as Error);
    response
      .status(error.code)
      .json({ error: error.message });
  }
}
