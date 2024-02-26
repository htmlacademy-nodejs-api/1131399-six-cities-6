import crypto from 'node:crypto';
import { Schema, Document, model, Types } from 'mongoose';
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

const userSchema = new Schema<UserDocument>({
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
      // pKCX6cTv 52617e8412433187d289137b9fd76509945684c4d2ecc82f21ef71c4a12ac94f
      const cryptedPassword = crypto.createHmac('sha256', password).update(config.get('SALT')).digest('hex');
      console.log(password, cryptedPassword);
      return cryptedPassword;
    }
  },
  token: {
    type: String,
    required: false,
  },
  type: String,
  selected: [Types.ObjectId],
}, {
  timestamps: true,
  collection: 'users'
});

export const UserModel = model<UserDocument>('User', userSchema);
