import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../libs/logger/index.js';
import { Label } from '../../libs/label/label.js';
import { Component } from '../../types/index.js';
import { HttpMethod } from '../../libs/rest/types/http-methods.enum.js';
import { IOfferService } from './offer.service.interface.js';
import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { ICommentService } from '../comment/comment.service.interface.js';
import { CreateCommentDto } from '../comment/DTO/create-comment.dto.js';
import { IUserService } from '../user/user.service.interface.js';

@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
    @inject(Component.OfferService) protected readonly offerService: IOfferService,
    @inject(Component.CommentService) protected readonly commentService: ICommentService,
    @inject(Component.UserService) protected readonly userService: IUserService,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.offerControllerRegisterRoutes'));

    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.createOffer});
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.getAllOffers});
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.getAllOffers});
    this.addRoute({ path: '/:offerId', method: HttpMethod.GET, handler: this.getOfferById});
    this.addRoute({ path: '/:offerId', method: HttpMethod.PUT, handler: this.updateOfferById});
    this.addRoute({ path: '/:offerId', method: HttpMethod.DELETE, handler: this.deleteOfferById});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.GET, handler: this.getAllCommentsOnOffer});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.POST, handler: this.createNewCommentOnOffer});
    this.addRoute({ path: '/premium', method: HttpMethod.POST, handler: this.getPremiumOffersOnTheScope});
    this.addRoute({ path: '/selected', method: HttpMethod.GET, handler: this.getAllSelectedOffers});
  }

  public async getOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const offer = await this.offerService.getOfferById(id);
    this.ok(response, offer);
  }

  public async getAllOffers(_request: Request, response: Response, _next: NextFunction) {
    const offers = await this.offerService.getAllOffers();
    this.ok(response, offers);
  }

  public async createOffer(request: Request, response: Response, _next: NextFunction) {
    const offerBody = request.body as CreateOfferDto;
    const offer = await this.offerService.createOffer(offerBody);
    this.ok(response, offer);
  }

  public async deleteOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const offer = await this.offerService.deleteOfferById(id);
    this.ok(response, offer);
  }

  public async updateOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const { body } = request;
    const offer = await this.offerService.updateOfferById(id, body);
    this.ok(response, offer);
  }


  public async getPremiumOffersOnTheScope(request: Request, response: Response, _next: NextFunction) {
    const { body } = request;
    const offers = await this.offerService.getPremiumOffersOnTheScope(body);
    this.ok(response, offers);
  }

  public async createNewCommentOnOffer(request: Request, response: Response, _next: NextFunction) {
    const { params, body } = request;
    const { offerId } = params;
    const { text, raiting, author } = body;
    const createCommentDto: CreateCommentDto = { text, author, raiting, offerId };
    const offer = await this.offerService.getOfferById(offerId);
    const user = await this.userService.getUserById(author);
    if (offer && user) {
      const comment = await this.commentService.createComment(createCommentDto);
      const comments: string[] = [comment['_id'], ...offer.comments || [] ];
      const newOffer = await this.offerService.updateOfferById(offer['_id'], { comments });
      this.ok(response, newOffer);
      return;
    }
    this.ok(response, null);
  }

  public getAllCommentsOnOffer(_request: Request, _response: Response, _next: NextFunction) {

  }

  public getAllSelectedOffers(_request: Request, _response: Response, _next: NextFunction) {

  }
}
