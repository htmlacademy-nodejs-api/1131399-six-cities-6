import { inject, injectable } from 'inversify';
import { CreateUserDto } from './DTO/create-user.dto.js';
import { UserDocument } from './user.model.js';
import { IUserService } from './user.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model } from 'mongoose';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.UserModel) private readonly userModel: Model<UserDocument>
  ){}

  public async create(dto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create(dto);
    this.logger.info(`${this.label.get('user.created')}: ${user.email}`);
    return user;
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    return null;

  }

  public async getUserById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    return null;

  }

  public async findOrCreate(dto: CreateUserDto): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (user) {
      return user;
    }
    try {
      const newUser = await this.userModel.create(dto);
      this.logger.info(this.label.get('user.created'));
      return newUser;
    } catch(_e) {
      this.logger.info(this.label.get('user.errorCreatingUser'));
      return null;
    }
  }
}
