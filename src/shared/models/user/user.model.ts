import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';
import { Label } from '../../libs/label/index.js';
// import { hash } from './helpers.js';

const label = new Label();

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    match: [/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}?$/, label.get('validation.emailIncorrect')],
  },
  avatar: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, label.get('validation.passwordMinLengthError')],
    maxlength: [12, label.get('validation.passwordMaxLengthError')],
  },
  type: String,
}, {
  timestamps: true,
});

export const UserModel = model<UserDocument>('User', userSchema);
