import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';

export const createOfferSchema: SchemaTypes = vine.object({
  title: vine.string().minLength(10).maxLength(100),
  description: vine.string().minLength(20).maxLength(1024),
  date: vine.string(),
  city: vine.string().in([ 'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']),
  previewImg: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)),
  images: vine.array(vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/))),
  premium: vine.boolean(),
  selected: vine.array(vine.string()).optional(),
  rating: vine.number().range([1, 5]).decimal([0, 1]),
  propertyType: vine.string().in(['apartment', 'house', 'room', 'hotel']),
  roomsCount: vine.number().range([1, 8]),
  guestsCount: vine.number().range([1, 10]),
  price: vine.number().range([100, 100000]),
  amenities: vine.array(vine.string().toLowerCase().in(['breakfast', 'air conditioning', 'laptop friendly workspace', 'baby seat', 'washer', 'towels', 'fridge'])),
  athour: vine.string(),
  comments: vine.array(vine.string()),
  coords: vine.object({
    lat: vine.number().decimal([0, 6]),
    long: vine.number().decimal([0, 6])
  }),
});

export const updateOfferSchema: SchemaTypes = vine.object({
  title: vine.string().minLength(10).maxLength(100).optional(),
  description: vine.string().minLength(20).maxLength(1024).optional(),
  date: vine.string().optional(),
  city: vine.string().in([ 'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']).optional(),
  previewImg: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)).optional(),
  images: vine.array(vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/))).optional(),
  premium: vine.boolean().optional(),
  selected: vine.array(vine.string()).optional(),
  rating: vine.number().range([1, 5]).decimal([0, 1]).optional(),
  propertyType: vine.string().in(['apartment', 'house', 'room', 'hotel']).optional(),
  roomsCount: vine.number().range([1, 8]).optional(),
  guestsCount: vine.number().range([1, 10]).optional(),
  price: vine.number().range([100, 100000]).optional(),
  amenities: vine.array(vine.string().toLowerCase().in(['breakfast', 'air conditioning', 'laptop friendly workspace', 'baby seat', 'washer', 'towels', 'fridge'])).optional(),
  athour: vine.string().optional(),
  comments: vine.array(vine.string()).optional(),
  coords: vine.object({
    lat: vine.number().decimal([0, 6]),
    long: vine.number().decimal([0, 6])
  }).optional(),
});
