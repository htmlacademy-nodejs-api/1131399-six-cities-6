import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { OfferDocument } from './offer.model.js';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<OfferDocument>
}
