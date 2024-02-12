import { inject, injectable } from 'inversify';
import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { OfferDocument } from './offer.model.js';
import { IOfferService } from './offer.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model } from 'mongoose';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>,
  ){}

  public async create(dto: CreateOfferDto): Promise<OfferDocument> {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`${this.label.get('offer.created')}: ${offer['_id']}`);
    return offer;
  }
}
