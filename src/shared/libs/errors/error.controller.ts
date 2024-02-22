import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../libs/logger/index.js';
import { Label } from '../../libs/label/label.js';
import { Component } from '../../types/index.js';
import { NoRequestedResourceError } from './index.js';

@injectable()
export class ErrorController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.commentsControllerRegisterRoutes'));
    this.addRoute({ path: '*', handler: this.errorRequest});
  }

  public errorRequest(_request: Request, _response: Response, _next: NextFunction) {
    throw new NoRequestedResourceError();
  }
}
