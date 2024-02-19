import { inject, injectable } from 'inversify';
import { CreateUserDto } from './DTO/create-user.dto.js';
import { UserDocument } from './user.model.js';
import { IUserService } from './user.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ILabel } from '../../libs/label/label.interface.js';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './DTO/update-user.dto.js';

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

  public async getSelectedFieldOnUser(userId: string): Promise<UserDocument['selected']> {
    const user = await this.userModel.findById(userId, 'selected');
    return (user?.selected || []).map((i) => i.toString());
  }

  public async updateUserById(userId: string, dto: UpdateUserDto): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndUpdate(userId, dto, { new: true });
    return user;
  }

  public async getSelectedOffersOnUser(userId: string): Promise<UserDocument['selected']> {
    const user = await this.userModel.findById(userId, 'selected');
    const users = await this.userModel.aggregate().match({ _id: new Types.ObjectId(userId) }).lookup({
      from: 'offers',
      foreignField: '_id',
      localField: 'selected',
      as: 'offers',
    }).exec();
    console.log('>', user);
    console.log('>>', users);
    return users[0]?.selected || [];
  }
}
