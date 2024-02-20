import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../libs/logger/index.js';
import { Label } from '../../libs/label/label.js';
import { Component } from '../../types/index.js';
import { HttpMethod } from '../../libs/rest/types/http-methods.enum.js';
import { ICommentService } from './comment.service.interface.js';

@injectable()
export class CommentController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
    @inject(Component.CommentService) protected readonly: ICommentService
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.commentsControllerRegisterRoutes'));

    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.GET, handler: this.getAllCommentsOnOffer});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.POST, handler: this.createNewCommentOnOffer});
  }

  public getAllCommentsOnOffer(_request: Request, _response: Response, _next: NextFunction) {

  }

  public createNewCommentOnOffer(_request: Request, _response: Response, _next: NextFunction) {

  }
}
