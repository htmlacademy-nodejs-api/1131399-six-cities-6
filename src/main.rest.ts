#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { RestApplication } from './rest/index.js';
import { Logger, ILogger } from './shared/libs/logger/index.js';
import { Config, IConfig, RestSchema } from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(Logger).inSingletonScope();
  container.bind<IConfig<RestSchema>>(Component.Config).to(Config).inSingletonScope();

  const restApplication = container.get<RestApplication>(Component.RestApplication);
  await restApplication.init();
}

bootstrap();
