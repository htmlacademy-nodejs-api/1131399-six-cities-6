import { inject, injectable } from 'inversify';
import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { OfferDocument } from './offer.model.js';
import { IOfferService } from './offer.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model } from 'mongoose';
import { UpdateOfferDto } from './DTO/update-offer.dto.js';
import { Comment } from '../../types/comment.type.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>,
  ){}

  public async createOffer(dto: CreateOfferDto): Promise<OfferDocument> {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`${this.label.get('offer.created')}: ${offer['_id']}`);
    return offer;
  }
  public getOfferById(id: string) {
    return Promise.resolve({id} as OfferDocument);
  }

  public updateOfferById(dto: UpdateOfferDto) {
    return Promise.resolve({ id: dto.id } as OfferDocument);
  }

  public patchOfferById(dto: UpdateOfferDto) {
    return Promise.resolve({ id: dto.id } as OfferDocument);
  }

  public deleteOfferById(id: string) {
    return Promise.resolve({ id } as OfferDocument);
  }

  public async getAllOffers() {
    const offers = await this.offerModel.find({}).exec();
    return offers as OfferDocument[];
      }

  public getAllCommentsOnOffer(_id: string) {
    return Promise.resolve([{}] as Comment[]);
  }

  public createNewCommentOnOffer(_offerId: string, commentDto: Comment) {
    return Promise.resolve(commentDto as Comment);
  }

  public getPremiumOffersOnTheScope(_scope: string[]) {
    return Promise.resolve([{}] as OfferDocument[]);
  }

  public getAllSelectedOffers(_userId: string) {
    return Promise.resolve([{}] as OfferDocument[]);
  }
}
