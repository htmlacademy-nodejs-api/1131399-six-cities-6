import { CreateUserDto } from './DTO/create-user.dto.js';
import { UpdateUserDto } from './DTO/update-user.dto.js';
import { UserDocument } from './user.model.js';

export interface IUserService {
  create(dto: CreateUserDto): Promise<UserDocument>,
  findByEmail(email: string): Promise<UserDocument | null>,
  getUserById(id: string): Promise<UserDocument | null>,
  findOrCreate(dto: CreateUserDto): Promise<UserDocument | null>,
  getSelectedFieldOnUser(userId: string): Promise<UserDocument['selected']>,
  getSelectedOffersOnUser(userId: string): Promise<UserDocument['selected']>,
  updateUserById(userId: string, user: UpdateUserDto): Promise<UserDocument | null>
}
