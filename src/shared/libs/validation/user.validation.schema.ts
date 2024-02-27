import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';

export const createUserSchema: SchemaTypes = vine.object({
  name: vine.string().minLength(1).maxLength(15),
  email: vine.string().trim().email(),
  avatar: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)),
  password: vine.string().minLength(6).maxLength(12),
  type: vine.string().in(['standard', 'pro']),
  selected: vine.array(vine.string()),
});

export const updateUserSchema: SchemaTypes = vine.object({
  name: vine.string().minLength(1).maxLength(15).optional(),
  email: vine.string().trim().email().optional(),
  avatar: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)).optional(),
  password: vine.string().minLength(6).maxLength(12).optional(),
  type: vine.string().in(['standard', 'pro']).optional(),
  selected: vine.array(vine.string()).optional(),
});
