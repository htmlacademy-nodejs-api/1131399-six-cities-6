import { CreateUserDto } from './DTO/create-user.dto.js';
import { UserDocument, UserModel } from './user.model.js';
import { IUserService } from './user.service.interface.js';

export class UserService implements IUserService {
  public async create(dto: CreateUserDto): Promise<UserDocument> {
    const user = UserModel.create(dto);
    return user;
  }
}
