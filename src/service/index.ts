import path from 'node:path';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { PORT, api_url } from './constants.js';
import { Offer } from '../constants/types.js';
import { Amenities, Property } from '../constants/enums.js';
import { FileWriter } from '../shared/libs/file-reader/file-writer.js';

export const getOffersDataFromApi = () => {
  const url = `${api_url}:${PORT}/offers`;
  return axios.get(url);
}

export const getCitiesDataFromApi = () => {
  const url = `${api_url}:${PORT}/cities`;
  return axios.get(url);
}

export const generateFakeOffersData = (n = 100, fileName: string) => {
  return getCitiesDataFromApi()
  .then(({ data: cities }) => {
    return getOffersDataFromApi()
    .then(({ data }) => {
      const fileWriter = new FileWriter(path.resolve('mocks', fileName));
      const citiesArray = Object.keys(cities);
      const city = citiesArray[faker.number.int({ min: 0, max: 5 })];
      const coords = cities[city];
      return Array(n).fill(data).map((i) => {
        return (fileWriter.write(getTSVStringFromOfferObject({
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
          city,
          roomsCount: faker.number.int({ min: 2, max: 6 }),
          guestsCount: faker.number.int({ min: 1, max: 5 }),
          premium: !!faker.number.int({ min: 0, max: 1 }),
          selected: !!faker.number.int({ min: 0, max: 1 }),
          rating: faker.number.int({ min: 1, max: 5 }),
          price: faker.number.int({ max: 10000, min: 500}),
          coords: {
            lat: coords.lat - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
            long: coords.long - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
          },
          amenities: Object.keys(Amenities)[faker.number.int({ min: 0, max: 7 })] as Amenities,
          propertyType: Object.keys(Property)[faker.number.int({ min: 0, max: 3 })] as Property,
        })));
      });
    })
  })
}

export const getTSVStringFromOfferObject = (object: Offer): string => {
  const {
    title,
    description,
    date,
    city,
    previewImg,
    images,
    premium,
    selected,
    rating,
    propertyType,
    roomsCount,
    guestsCount,
    price,
    amenities,
    athour,
    comments,
    coords
  } = object;
  const imagesString = images?.join(',');
  const premiumString = premium ? 'true' : 'false';
  const selectedString = selected ? 'true' : 'false';
  const coordsString = JSON.stringify(coords);
  const string = Object.values({
    title,
    description,
    date,
    city,
    previewImg,
    imagesString,
    premiumString,
    selectedString,
    rating,
    propertyType,
    roomsCount,
    guestsCount,
    price,
    amenities,
    athour,
    comments,
    coordsString
  }).join('\t');
  return string;
}
