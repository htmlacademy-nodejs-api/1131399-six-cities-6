import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/types';
import { Amenities, City, Property } from '../../../constants/enums.js';
import { boundaries as b } from '../../../constants/constants.js';

export const createOfferSchema: SchemaTypes = vine.object({
  title: vine.string().minLength(b.offer.title.minLength).maxLength(b.offer.title.maxLength),
  description: vine.string().minLength(b.offer.description.minLength).maxLength(b.offer.description.maxLength),
  date: vine.string(),
  city: vine.string().in([City.Paris, City.Cologne, City.Brussels, City.Amsterdam, City.Hamburg, City.Dusseldorf]),
  previewImg: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)),
  images: vine.array(vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/))),
  premium: vine.boolean(),
  selected: vine.array(vine.string()).optional(),
  rating: vine.number().range([b.offer.rating.min, b.offer.rating.max]).decimal([b.offer.rating.from, b.offer.rating.to]),
  propertyType: vine.string().in([Property.Apartment, Property.House, Property.Room, Property.Hotel]),
  roomsCount: vine.number().range([b.offer.roomsCount.min, b.offer.roomsCount.max]),
  guestsCount: vine.number().range([b.offer.guestsCount.min, b.offer.guestsCount.max]),
  price: vine.number().range([b.offer.price.min, b.offer.price.max]),
  amenities: vine.array(vine.string().toLowerCase().in(Object.values(Amenities))),
  athour: vine.string(),
  comments: vine.array(vine.string()),
  coords: vine.object({
    lat: vine.number().decimal([b.offer.coordinates.min, b.offer.coordinates.max]),
    long: vine.number().decimal([b.offer.coordinates.min, b.offer.coordinates.max])
  }),
});

export const updateOfferSchema: SchemaTypes = vine.object({
  title: vine.string().minLength(b.offer.title.minLength).maxLength(b.offer.title.maxLength).optional(),
  description: vine.string().minLength(b.offer.description.minLength).maxLength(b.offer.description.maxLength).optional(),
  date: vine.string().optional(),
  city: vine.string().in([ City.Paris, City.Cologne, City.Brussels, City.Amsterdam, City.Hamburg, City.Dusseldorf]).optional(),
  previewImg: vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)).optional(),
  images: vine.array(vine.string().trim().url().regex(new RegExp(/[^\s]+(.*?)\.(jpeg|jpg|png|JPEG|JPG|PNG)$/))).optional(),
  premium: vine.boolean().optional(),
  selected: vine.array(vine.string()).optional(),
  rating: vine.number().range([b.offer.rating.min, b.offer.rating.max]).decimal([b.offer.rating.from, b.offer.rating.to]).optional(),
  propertyType: vine.string().in([Property.Apartment, Property.House, Property.Room, Property.Hotel]).optional(),
  roomsCount: vine.number().range([b.offer.roomsCount.min, b.offer.roomsCount.max]).optional(),
  guestsCount: vine.number().range([b.offer.guestsCount.min, b.offer.guestsCount.max]).optional(),
  price: vine.number().range([b.offer.price.min, b.offer.price.max]).optional(),
  amenities: vine.array(vine.string().toLowerCase().in(Object.values(Amenities))).optional(),
  athour: vine.string().optional(),
  comments: vine.array(vine.string()).optional(),
  coords: vine.object({
    lat: vine.number().decimal([b.offer.coordinates.min, b.offer.coordinates.max]),
    long: vine.number().decimal([b.offer.coordinates.min, b.offer.coordinates.max])
  }).optional(),
});
