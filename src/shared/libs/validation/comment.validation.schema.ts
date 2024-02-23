import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';
import { boundaries as b } from '../../../constants/constants.js';

export const createCommentSchema: SchemaTypes = vine.object({
  text: vine.string().minLength(b.comment.text.minLength).maxLength(b.comment.text.maxLength),
  rating: vine.number().range([b.offer.rating.min, b.offer.rating.max]).optional(),
  author: vine.string(),
});

export const updateCommentSchema: SchemaTypes = vine.object({
  text: vine.string().minLength(b.comment.text.minLength).maxLength(b.comment.text.maxLength).optional(),
  rating: vine.number().range([b.offer.rating.min, b.offer.rating.max]).optional(),
  author: vine.string(),
});
