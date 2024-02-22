import vine from '@vinejs/vine';

export const createUserSchema = vine.object({
  name: vine.string(),
  email: vine.string(),
  avatar: vine.string(),
  password: vine.string(),
  type: vine.string(),
  selected: vine.string(),
});

export const updateUserSchema = vine.object({
  name: vine.string(),
  email: vine.string(),
  avatar: vine.string(),
  password: vine.string(),
  type: vine.string(),
  selected: vine.string(),
});
