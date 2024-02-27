import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';

export const createCommentSchema: SchemaTypes = vine.object({
  text: vine.string().minLength(5).maxLength(1024),
  rating: vine.number().range([1, 5]).optional(),
  author: vine.string(),
});

export const updateCommentSchema: SchemaTypes = vine.object({
  text: vine.string().minLength(5).maxLength(1024).optional(),
  rating: vine.number().range([1, 5]).optional(),
  author: vine.string(),
});
