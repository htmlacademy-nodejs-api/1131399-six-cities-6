import { Container } from 'inversify';
import { UserService } from './user.service.js';
import { Component } from '../../types/component.enum.js';
import { UserDocument, UserModel } from './user.model.js';
import { Model } from 'mongoose';

export function createUserContainer() {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(UserService).inSingletonScope();
  container.bind<Model<UserDocument>>(Component.UserModel).toConstantValue(UserModel);
  return container;
}
