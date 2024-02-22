import { inject, injectable } from 'inversify';
import { CreateUserDto } from './DTO/create-user.dto.js';
import { UserDocument } from './user.model.js';
import { IUserService } from './user.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model } from 'mongoose';
import { UpdateUserDto } from './DTO/update-user.dto.js';
import { OfferDocument } from '../offer/offer.model.js';
import { CreateUserError, GetSelectedFieldOnUserError, GetSelectedOffersOnUserError, GetUserByEmailError, GetUserByIdError, UpdateUserError } from '../../libs/errors/userErrors.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.UserModel) private readonly userModel: Model<UserDocument>,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>,
  ){}

  public async create(dto: CreateUserDto): Promise<UserDocument> {
    try{
      const user = await this.userModel.create(dto);
      if (user) {
        this.logger.info(`${this.label.get('user.created')}: ${user.email}`);
        return user;
      }
      throw new Error();
    } catch(_) {
      throw new CreateUserError();
    }
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        return user;
      }
      throw new Error();
    } catch(_) {
      throw new GetUserByEmailError();
    }
  }

  public async getUserById(id: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findById(id);
      if (user) {
        return user;
      }
      throw new Error();
    } catch(_) {
      throw new GetUserByIdError();
    }

  }

  public async findOrCreate(dto: CreateUserDto): Promise<UserDocument | null> {
    try {
      try {
        const user = await this.userModel.findOne({ email: dto.email });
        if (user) {
          return user;
        }
        throw new Error();
      } catch(_) {
        try {
          const newUser = await this.userModel.create(dto);
          if (newUser) {
            this.logger.info(this.label.get('user.created'));
            return newUser;
          }
          throw new Error();
        } catch(_e) {
          throw new Error();
        }
      }
    } catch(_e) {
      this.logger.info(this.label.get('user.errorCreatingUser'));
      throw new CreateUserError();
    }
  }

  public async getSelectedFieldOnUser(userId: string): Promise<UserDocument['selected']> {
    try {
      const user = await this.userModel.findById(userId, 'selected');
      if (user) {
        return (user?.selected || []).map((i) => i.toString());
      }
      throw new Error();
    } catch(_) {
      throw new GetSelectedFieldOnUserError();
    }
  }

  public async updateUserById(userId: string, dto: UpdateUserDto): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findByIdAndUpdate(userId, dto, { new: true });
      if (user) {
        return user;
      }
      throw new Error();
    } catch(_) {
      throw new UpdateUserError();
    }
  }

  public async getSelectedOffersOnUser(userId: string): Promise<OfferDocument[]> {
    try {
      const user = await this.userModel.findById(userId, 'selected');
      if (!user) {
        throw new Error();
      }
      const selectedOffers = await Promise.all((user?.selected || []).map(async(i) => {
        const offer = await this.offerModel.findById(i);
        if (offer) {
          return offer as OfferDocument;
        }
        return {} as OfferDocument;
      }));
      return selectedOffers as OfferDocument[];

    } catch (_) {
      throw new GetSelectedOffersOnUserError();
    }

  }
}
