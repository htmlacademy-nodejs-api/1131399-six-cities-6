import { Container } from 'inversify';
import { Component } from '../shared/types/index.js';
import { RestApplication } from '../rest/index.js';
import { Logger, ILogger } from '../shared/libs/logger/index.js';
import { Config, IConfig, RestSchema } from '../shared/libs/config/index.js';
import { ILabel, Label } from '../shared/libs/label/index.js';
import { IDatabaseClient, DatabaseClient } from '../shared/libs/database-client/index.js';
import { IBaseExceptionHandler } from '../shared/libs/exceptionHandler/exception-handler.interface.js';
import { BaseExceptionHandler } from '../shared/libs/exceptionHandler/exception-handler.js';

export const createRestApllicationContainer = () => {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(Logger).inSingletonScope();
  container.bind<IConfig<RestSchema>>(Component.Config).to(Config).inSingletonScope();
  container.bind<ILabel>(Component.Label).to(Label).inSingletonScope();
  container.bind<IDatabaseClient>(Component.DatabaseClient).to(DatabaseClient).inSingletonScope();
  container.bind<IBaseExceptionHandler>(Component.ExceptionHandler).to(BaseExceptionHandler).inSingletonScope();
  return container;
};
