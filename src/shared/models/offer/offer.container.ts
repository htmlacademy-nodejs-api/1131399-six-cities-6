import { Container } from 'inversify';
import { OfferService } from './offer.service.js';
import { Component } from '../../types/component.enum.js';
import { OfferDocument, OfferModel } from './offer.model.js';
import { Model } from 'mongoose';
import { Controller } from '../../libs/rest/controller/controller.interface.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<OfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  container.bind<Model<OfferDocument>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return container;
}
