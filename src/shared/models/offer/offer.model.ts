import { Schema, Document, model } from 'mongoose';
import { Offer } from '../../types/index.js';

export interface OfferDocument extends Offer, Document {
  createdAt: Date,
  updatedAt: Date,
}

const offerSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  city: String,
  previewImg: String,
  images: [String],
  premium: Boolean,
  selected: Boolean,
  rating: Number,
  propertyType: String,
  roomsCount: Number,
  guestsCount: Number,
  price: Number,
  amenities: String,
  athour: String,
  comments: [String],
  coords: [String],
}, {
  timestamps: true,
});

export const OfferModel = model<OfferDocument>('Offer', offerSchema);
