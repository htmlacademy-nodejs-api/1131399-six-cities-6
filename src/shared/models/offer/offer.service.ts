import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { OfferDocument, OfferModel } from './offer.model.js';
import { IOfferService } from './offer.service.interface.js';

export class OfferService implements IOfferService {
  public async create(dto: CreateOfferDto): Promise<OfferDocument> {
    const offer = OfferModel.create(dto);
    return offer;
  }
}
