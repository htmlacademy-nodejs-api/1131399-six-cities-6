import { Offer, Booleans } from '../constants/types.js';
import _ from 'lodash';
import { CreateOfferDto } from '../shared/models/offer/DTO/create-offer.dto.js';
type key = keyof Offer;

export class OfferFactory {
  private offer: Offer = {
    title: null,
    description: null,
    date: null,
    city: null,
    previewImg: null,
    images: null,
    premium: null,
    selected: null,
    rating: null,
    propertyType: null,
    roomsCount: null,
    guestsCount: null,
    price: null,
    amenities: null,
    athour: null,
    comments: null,
    coords: null,
  };

  public getOffer(data: string[]):CreateOfferDto {
    const currentOffer: CreateOfferDto = (Object.keys(this.offer) as key[]).reduce((acc, i, index) => {
      const value = data[index];
      if (i === 'coords') {
        _.set(acc, i, JSON.parse(value));
        return acc;
      }
      if (value === Booleans.true) {
        _.set(acc, i, true);
        return acc;
      }
      if (value === Booleans.false) {
        _.set(acc, i, false);
        return acc;
      } else {
        _.set(acc, i, data[index]);
        return acc;
      }
    }, Object.assign({}, this.offer) as Offer);
    return currentOffer;
  }
}
