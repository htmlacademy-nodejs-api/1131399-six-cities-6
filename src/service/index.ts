import axios from 'axios';
import { faker } from '@faker-js/faker';
import { PORT, api_url } from './constants.js';
import { Offer } from '../constants/types.js';
import { City } from '../constants/enums.js';

export const getOffersDataFromApi = () => {
  const url = `${api_url}:${PORT}/offers`;
  return axios.get(url);
}

export const getCitiesDataFromApi = () => {
  const url = `${api_url}:${PORT}/cities`;
  return axios.get(url);
}

export const getFakeOffersDataFromApi = (n = 100) => {
  return getOffersDataFromApi()
    .then(({ data }) => {
      const returnDataArray: Offer[] = Array(n).fill(data).map((i) => {
        return ({
          ...Object.keys(i).reduce((acc, key) => ({
            ...acc,
            [key]: key,
          }), {} as Offer),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          date: faker.date.recent(),
          previewImg: faker.image.url(),
          images: Array(10).fill({}).map(() => faker.image.url()),
          athour: faker.person.fullName(),
          city: Object.values(City)[faker.number.int({ min: 0, max: 5 })],
          roomsCount: faker.number.int({ min: 2, max: 6 }),
          guestsCount: faker.number.int({ min: 1, max: 5 }),
          premium: !!faker.number.int({ min: 0, max: 1 }),
          selected: !!faker.number.int({ min: 0, max: 1 }),
          rating: faker.number.int({ min: 1, max: 5 }),
          price: faker.number.int({ max: 10000, min: 500})
        });
      });
      return returnDataArray;
    })
}
