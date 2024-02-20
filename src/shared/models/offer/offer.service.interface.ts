import { Comment } from '../../types/comment.type.js';
import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { UpdateOfferDto } from './DTO/update-offer.dto.js';
import { OfferDocument } from './offer.model.js';

export interface IOfferService {
  createOffer(dto: CreateOfferDto): Promise<OfferDocument | null>
  getOfferById(id: string): Promise<OfferDocument>
  updateOfferById(id: string, dto: UpdateOfferDto): Promise<OfferDocument>
  deleteOfferById(id: string): Promise<OfferDocument | null>
  getAllOffers(): Promise<OfferDocument[]>
  getAllCommentsOnOffer(offerId: string): Promise<OfferDocument | null>
  createNewCommentOnOffer(offerId: string, commentDto: Comment): Promise<Comment>
  getPremiumOffersOnTheScope(scope: string[]): Promise<(OfferDocument | null)[]>
  getAllSelectedOffers(userId: string): Promise<OfferDocument[]>
  getSelectedFieldOnOffer(offerId: string): Promise<OfferDocument | null>
}
