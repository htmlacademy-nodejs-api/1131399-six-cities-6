import { inject, injectable } from "inversify";
import { BaseController } from "../../libs/rest/controller/base-controller.abstract.js";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../../libs/logger/index.js";
import { Label } from "../../libs/label/label.js";
import { Component } from "../../types/index.js";
import { HttpMethod } from "../../libs/rest/types/http-methods.enum.js";

@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.offerControllerRegisterRoutes'));

    this.addRoute({ path: '/:offerId', method: HttpMethod.GET, handler: this.getOfferById});
    this.addRoute({ path: '/:offerId', method: HttpMethod.PUT, handler: this.updateOfferById});
    this.addRoute({ path: '/:offerId', method: HttpMethod.PATCH, handler: this.patchOfferById});
    this.addRoute({ path: '/:offerId', method: HttpMethod.DELETE, handler: this.deleteOfferById});
    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.createOffer});
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.getAllOffers});
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.getAllOffers});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.GET, handler: this.getAllCommentsOnOffer});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.POST, handler: this.createNewCommentOnOffer});
    this.addRoute({ path: '/premium', method: HttpMethod.POST, handler: this.getPremiumOffersOnTheScope});
    this.addRoute({ path: '/selected', method: HttpMethod.GET, handler: this.getAllSelectedOffers});
  }
  public getOfferById(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public updateOfferById(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public patchOfferById(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public deleteOfferById(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public createOffer(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public getAllOffers(_reques: Request, _response: Response, _next: NextFunction) {
    return _response.send(('Hi'));
  }
  public getAllCommentsOnOffer(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public createNewCommentOnOffer(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public getPremiumOffersOnTheScope(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public getAllSelectedOffers(_reques: Request, _response: Response, _next: NextFunction) {

  }
}
