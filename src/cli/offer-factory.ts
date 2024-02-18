import { Offer, Booleans } from '../constants/types.js';
import _ from 'lodash';
import moment from 'moment';
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
    selected: [],
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
      }
      if (['images', 'amenities'].includes(i)) {
        _.set(acc, i, value.split(','));
        return acc;
      }
      if (i === 'date') {
        _.set(acc, i, moment(Date.parse(value)).toISOString());
        return acc;
      }
      if (['athour', 'selected', 'comments'].includes(i)) {
        _.set(acc, i, JSON.parse(value));
        return acc;
      }
      if (['rating', 'roomsCount', 'guestsCount', 'price'].includes(i)) {
        _.set(acc, i, parseInt(value, 10));
        return acc;
      } else {
        _.set(acc, i, data[index]);
        return acc;
      }
    }, Object.assign({}, this.offer) as Offer);
    return currentOffer;
  }
}
