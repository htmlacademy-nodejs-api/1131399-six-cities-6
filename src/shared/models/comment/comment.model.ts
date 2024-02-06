import { Schema, Document, model } from 'mongoose';
import { Comment } from '../../types/index.js';

export interface CommentDocument extends Comment, Document {
  createdAt: Date,
  updatedAt: Date,
}

const commentSchema = new Schema({
  text: String,
  date: Date,
  raiting: Number,
  author: String,
}, {
  timestamps: true,
});

export const CommentModel = model<CommentDocument>('Comment', commentSchema);
