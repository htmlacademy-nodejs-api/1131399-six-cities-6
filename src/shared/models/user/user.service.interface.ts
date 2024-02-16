import { CreateUserDto } from './DTO/create-user.dto.js';
import { UserDocument } from './user.model.js';

export interface IUserService {
  create(dto: CreateUserDto): Promise<UserDocument>,
  findByEmail(email: string): Promise<UserDocument | null>,
  findOrCreate(dto: CreateUserDto): Promise<UserDocument>,
}
