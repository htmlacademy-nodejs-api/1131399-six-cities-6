import { Types, Schema, Document, model } from 'mongoose';
import { Comment } from '../../types/index.js';

export interface CommentDocument extends Comment, Document {
  createdAt: Date,
  updatedAt: Date,
}

const commentSchema = new Schema({
  text: String,
  raiting: Number,
  author: Types.ObjectId,
}, {
  timestamps: true,
});

export const CommentModel = model<CommentDocument>('Comment', commentSchema);
