import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IBaseExceptionHandler } from './exception-handler.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { GetOfferError } from '../errors/offerErrors.js';


@injectable()
export class BaseExceptionHandler implements IBaseExceptionHandler {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ){
    this.logger.info('BaseExceptionHandler register');
  }

  catch(error: Error, _reques: Request, response: Response, _next: NextFunction): void {
    this.logger.warn(error.message, error);
    if (error instanceof GetOfferError) {
      response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message });
      return;
    }
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
