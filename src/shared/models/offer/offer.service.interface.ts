import { Comment } from '../../types/comment.type.js';
import { CreateOfferDto } from './DTO/create-offer.dto.js';
import { UpdateOfferDto } from './DTO/update-offer.dto.js';
import { OfferDocument } from './offer.model.js';

export interface IOfferService {
  createOffer(dto: CreateOfferDto): Promise<OfferDocument>
  getOfferById(id: string): Promise<OfferDocument>
  updateOfferById(dto: UpdateOfferDto): Promise<OfferDocument>
  patchOfferById(dto: UpdateOfferDto): Promise<OfferDocument>
  deleteOfferById(id: string): Promise<OfferDocument>
  getAllOffers(): Promise<OfferDocument[]>
  getAllCommentsOnOffer(offerId: string): Promise<Comment[]>
  createNewCommentOnOffer(offerId: string, commentDto: Comment): Promise<Comment>
  getPremiumOffersOnTheScope(scope: string[]): Promise<OfferDocument[]>
  getAllSelectedOffers(userId: string): Promise<OfferDocument[]>
}
