import { Container } from 'inversify';
import { UserService } from './user.service.js';
import { Component } from '../../types/component.enum.js';
import { UserDocument, UserModel } from './user.model.js';
import { Model } from 'mongoose';
import { Controller } from '../../libs/rest/controller/controller.interface.js';
import { UserController } from './user.controller.js';
import { IAuthorizationService } from '../../libs/rest/authorization/authorization.service.interface.js';
import { AuthorizationService } from '../../libs/rest/authorization/authorization.service.js';

export function createUserContainer() {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(UserService).inSingletonScope();
  container.bind<Model<UserDocument>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<Controller>(Component.UsersController).to(UserController).inSingletonScope();
  container.bind<IAuthorizationService>(Component.Authorization).to(AuthorizationService).inSingletonScope();
  return container;
}
