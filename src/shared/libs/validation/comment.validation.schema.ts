import vine from '@vinejs/vine';

export const createCommentSchema = vine.object({
  text: vine.string(),
  email: vine.string(),
  rating: vine.string(),
  author: vine.string(),
  offerId: vine.string(),
});

export const updateCommentSchema = vine.object({
  text: vine.string(),
  email: vine.string(),
  rating: vine.string(),
  author: vine.string(),
  offerId: vine.string(),
});
