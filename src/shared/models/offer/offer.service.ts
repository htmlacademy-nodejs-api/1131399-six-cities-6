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
import { IUserService } from '../user/user.service.interface.js';
import { CreateUserDto } from '../user/DTO/create-user.dto.js';
import { CreateOfferError, DeleteOfferError, GetAllOffersError, GetCommentsOnOfferError, GetOfferError, GetPremiumOffersOnTheScopeError, GetSelectedFieldOnOfferError, UpdateOfferError } from '../../libs/errors/index.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>,
    @inject(Component.UserService) private readonly userService: IUserService,
  ){}

  public async createOffer(dto: CreateOfferDto): Promise<OfferDocument | null> {
    try {
      const user = await this.userService.findOrCreate(dto.athour as CreateUserDto);
      if (!user) {
        throw new Error();
      }
      const offer = await this.offerModel.create({
        ...dto,
        athour: user['_id'],
      });
      this.logger.info(`${this.label.get('offer.created')}: ${offer['_id']}`);
      return offer;
    } catch(e) {
      throw new CreateOfferError();
    }
  }

  public async getOfferById(id: string) {
    try {
      const offer = await this.offerModel.findById(id) as OfferDocument;
      if (offer) {
        return offer;
      } else {
        throw new Error();
      }
    } catch(_e) {
      throw new GetOfferError();
    }
  }

  public async updateOfferById(id: string, dto: UpdateOfferDto) {
    try {
      const offer = await this.offerModel.findByIdAndUpdate(id, dto, { new: true }) as OfferDocument;
      if (offer) {
        return offer;
      } else {
        throw new Error();
      }
    } catch(_e) {
      throw new UpdateOfferError();
    }
  }

  public patchOfferById(dto: UpdateOfferDto) {
    return Promise.resolve({ id: dto.id } as OfferDocument);
  }

  public async deleteOfferById(id: string) {
    try {
      const offer = await this.offerModel.findById(id) as OfferDocument;
      if (offer) {
        const { deletedCount } = await this.offerModel.deleteOne({ _id: id });
        if (deletedCount) {
          return offer;
        }
        throw new Error();
      }
      throw new Error();
    } catch(_e) {
      throw new DeleteOfferError();
    }
  }

  public async getAllOffers() {
    try {
      const offers = await this.offerModel.find({}).populate('athour', ['name', 'email']).exec();
      if (offers) {
        return offers as OfferDocument[];
      }
      throw new Error();
    } catch(_) {
      throw new GetAllOffersError();
    }
  }

  public async getAllCommentsOnOffer(offerId: string) {
    try {
      const comments = await this.offerModel.findById(offerId, 'comments').populate('comments').exec();
      if (comments) {
        return comments;
      }
      throw new Error();
    } catch(_) {
      throw new GetCommentsOnOfferError();
    }
  }

  public createNewCommentOnOffer(_offerId: string, commentDto: Comment) {
    return Promise.resolve(commentDto as Comment);
  }

  public async getPremiumOffersOnTheScope(scope: string[]) {
    try {
      const offers = await Promise.all(scope.map(async(city) => {
        try {
          const result = await this.offerModel.find({ city });
          if (!result) {
            return [];
          }
          return result;
        } catch (e) {
          return [];
        }
      }));
      return offers.flat();
    } catch(_) {
      throw new GetPremiumOffersOnTheScopeError();
    }
  }

  public async getSelectedFieldOnOffer(offerId: string) {
    try {
      const selectedField = await this.offerModel.findById(offerId, 'selected').exec();
      if (selectedField) {
        return selectedField;
      }
      throw new Error();
    } catch(_) {
      throw new GetSelectedFieldOnOfferError();
    }
  }
}
