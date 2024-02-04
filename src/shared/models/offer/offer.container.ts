import { Container } from 'inversify';
import { OfferService } from './offer.service.js';
import { Component } from '../../types/component.enum.js';
import { OfferDocument, OfferModel } from './offer.model.js';
import { Model } from 'mongoose';

export function createOfferContainer() {
  const container = new Container();
  container.bind<OfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  container.bind<Model<OfferDocument>>(Component.OfferModel).toConstantValue(OfferModel);
  return container;
}
