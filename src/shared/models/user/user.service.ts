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
}
