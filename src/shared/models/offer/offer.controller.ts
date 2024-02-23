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
import { Operations } from './constants.js';
import { IMiddlewares } from '../../libs/middleware/middleware.interface.js';

@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
    @inject(Component.OfferService) protected readonly offerService: IOfferService,
    @inject(Component.CommentService) protected readonly commentService: ICommentService,
    @inject(Component.UserService) protected readonly userService: IUserService,
    @inject(Component.Middlewares) protected readonly middlewares: IMiddlewares,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.offerControllerRegisterRoutes'));

    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.createOffer, middlewares: [this.middlewares.validateCreateOfferDTO]});
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.getAllOffers});
    this.addRoute({ path: '/:offerId', method: HttpMethod.GET, handler: this.getOfferById, middlewares: [this.middlewares.checkOfferObjectID]});
    this.addRoute({ path: '/:offerId', method: HttpMethod.PUT, handler: this.updateOfferById, middlewares: [this.middlewares.checkOfferObjectID, this.middlewares.validateUpdateOfferDTO]});
    this.addRoute({ path: '/:offerId', method: HttpMethod.DELETE, handler: this.deleteOfferById, middlewares: [this.middlewares.checkOfferObjectID]});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.GET, handler: this.getAllCommentsOnOffer, middlewares: [this.middlewares.checkOfferObjectID]});
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.POST, handler: this.createNewCommentOnOffer, middlewares: [this.middlewares.checkOfferObjectID, this.middlewares.validateCreateCommentsDTO]});
    this.addRoute({ path: '/premium', method: HttpMethod.POST, handler: this.getPremiumOffersOnTheScope});
    this.addRoute({ path: '/:offerId/selected', method: HttpMethod.PATCH, handler: this.addRemoveOfferFromSelected, middlewares: [this.middlewares.checkOfferObjectID]});
  }

  public async getOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const offer = await this.offerService.getOfferById(id);
    if (offer) {
      this.ok(response, offer);
    } else {
      this.noContent(response, {});
    }
  }

  public async getAllOffers(_request: Request, response: Response, _next: NextFunction) {
    const offers = await this.offerService.getAllOffers();
    if (offers) {
      this.ok(response, offers);
    } else {
      this.noContent(response, []);
    }
  }

  public async createOffer(request: Request, response: Response, _next: NextFunction) {
    const offerBody = request.body as CreateOfferDto;
    const offer = await this.offerService.createOffer(offerBody);
    if (offer) {
      this.created(response, offer);
    } else {
      this.noContent(response, {});
    }
  }

  public async deleteOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const offer = await this.offerService.deleteOfferById(id);
    if (offer) {
      this.ok(response, offer);
    } else {
      this.noContent(response, {});
    }
  }

  public async updateOfferById(request: Request, response: Response, _next: NextFunction) {
    const id = request.params.offerId;
    const { body } = request;
    const offer = await this.offerService.updateOfferById(id, body);
    if (offer) {
      this.ok(response, offer);
    } else {
      this.noContent(response, {});
    }
  }


  public async getPremiumOffersOnTheScope(request: Request, response: Response, _next: NextFunction) {
    const { body } = request;
    const offers = await this.offerService.getPremiumOffersOnTheScope(body);
    if (offers) {
      this.ok(response, offers);
    } else {
      this.noContent(response, []);
    }
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
      this.created(response, newOffer);
      return;
    }
    this.noContent(response, null);
  }

  public async getAllCommentsOnOffer(request: Request, response: Response, _next: NextFunction) {
    const { params } = request;
    const { offerId } = params;
    const comments = await this.offerService.getAllCommentsOnOffer(offerId);
    if (comments) {
      this.ok(response, comments);
    } else {
      this.noContent(response, []);
    }
  }

  public async addRemoveOfferFromSelected(request: Request, response: Response, _next: NextFunction) {
    const { params, body } = request;
    const { offerId } = params;
    const { operation, userId } = body;
    const selectedFieldOnUser = await this.userService.getSelectedFieldOnUser(userId);
    if (operation === Operations.ADD) {
      if (!selectedFieldOnUser.includes(offerId)) {
        const newSelected = [...selectedFieldOnUser, offerId];
        const newUser = await this.userService.updateUserById(userId, { selected: newSelected });
        this.ok(response, newUser);
        return;
      }
      this.noContent(response, []);
      return;
    }
    if (operation === Operations.REMOVE) {
      if (selectedFieldOnUser.includes(offerId)) {
        const newSelected = selectedFieldOnUser.filter((i) => i !== offerId);
        const newUser = await this.userService.updateUserById(userId, { selected: newSelected });
        this.ok(response, newUser);
        return;
      }
      this.noContent(response, []);

    }
  }
}
