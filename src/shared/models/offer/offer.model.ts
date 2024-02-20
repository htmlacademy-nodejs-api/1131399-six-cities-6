import mongoose, { Schema, Document, model } from 'mongoose';
import { Offer } from '../../types/index.js';
import { UserModel } from '../user/user.model.js';
import { CommentModel } from '../comment/comment.model.js';

export interface OfferDocument extends Offer, Document {
  createdAt: 'Date',
  updatedAt: 'Date',
}

const offerSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  city: String,
  previewImg: String,
  images: [String],
  premium: Boolean,
  selected: [String],
  rating: Number,
  propertyType: String,
  roomsCount: Number,
  guestsCount: Number,
  price: Number,
  amenities: [String],
  athour: {
    type: mongoose.Types.ObjectId,
    ref: UserModel
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: CommentModel
  }],
  coords: { lat: Number, long: Number },
}, {
  timestamps: true,
  collection: 'offers'
});

export const OfferModel = model<OfferDocument>('Offers', offerSchema);
