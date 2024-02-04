#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { RestApplication } from './rest/index.js';
import { createRestApllicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/models/user/user.container.js';
import { createOfferContainer } from './shared/models/offer/offer.container.js';
import { createCommentContainer } from './shared/models/comment/comment.container.js';

async function bootstrap() {
  const container = Container.merge(
    createRestApllicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );
  const restApplication = container.get<RestApplication>(Component.RestApplication);
  await restApplication.init();
}

bootstrap();
