import crypto from 'node:crypto';
import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';
import { Label } from '../../libs/label/index.js';
import { Config } from '../../libs/config/rest.config.js';
import { Logger } from '../../libs/logger/index.js';

const logger = new Logger();
const label = new Label();
const config = new Config(logger, label);
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
    set: (password: string) => {
      if (password.length < 6) {
        throw new Error(label.get('validation.passwordMinLengthError'));
      }
      if (password.length > 12) {
        throw new Error(label.get('validation.passwordMaxLengthError'));
      }
      return crypto.createHmac('sha256', password).update(config.get('SALT')).digest('hex');
    }
  },
  type: String,
}, {
  timestamps: true,
  collection: 'users'
});

export const UserModel = model<UserDocument>('User', userSchema);
