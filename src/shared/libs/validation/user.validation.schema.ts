import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';
import { UserType } from '../../types/user.type.js';
import { boundaries as b } from '../../../constants/constants.js';

export const createUserSchema: SchemaTypes = vine.object({
  name: vine.string().minLength(b.user.name.minLength).maxLength(b.user.name.maxLength),
  email: vine.string().trim().email(),
  avatar: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)),
  password: vine.string().minLength(b.user.password.minLength).maxLength(b.user.password.maxLength),
  type: vine.string().in([UserType.standard, UserType.pro]),
  selected: vine.array(vine.string()),
});

export const updateUserSchema: SchemaTypes = vine.object({
  name: vine.string().minLength(b.user.name.minLength).maxLength(b.user.name.maxLength).optional(),
  email: vine.string().trim().email().optional(),
  avatar: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)).optional(),
  password: vine.string().minLength(b.user.password.minLength).maxLength(b.user.password.maxLength).optional(),
  type: vine.string().in([UserType.standard, UserType.pro]).optional(),
  selected: vine.array(vine.string()).optional(),
});
