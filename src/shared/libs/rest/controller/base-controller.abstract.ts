import { injectable } from 'inversify';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Logger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from './controller.interface.js';
import { Route } from '../types/router.interface.js';
import { Label } from '../../label/label.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger,
    protected readonly labels: Label
  ) {
    this._router = Router();
  }

  get router(){
    return this._router;
  }

  public addRoute(route: Route){
    this._router[route.method](route.path, asyncHandler(route.handler.bind(this)));
    this.logger.info(`${this.labels.get('router.routeRegistered')} ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(response: Response, statusCode: number, data: T){
    response
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(response: Response, data: T){
    this.send(response, StatusCodes.OK, data);
  }

  public created<T>(response: Response, data: T){
    this.send(response, StatusCodes.CREATED, data);
  }

  public noContent<T>(response: Response, data: T){
    this.send(response, StatusCodes.NO_CONTENT, data);
  }

}
