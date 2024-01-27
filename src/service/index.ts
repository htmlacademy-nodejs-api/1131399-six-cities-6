import path from 'node:path';
import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import { PORT, apiUrl } from './constants.js';
import { Booleans, Coordinates, Offer } from '../constants/types.js';
import { Amenities, Property, City } from '../constants/enums.js';
import { FileWriter } from '../shared/libs/file-writer/file-writer.js';

export const getOffersDataFromApi = (): Promise<AxiosResponse<Offer>> => {
  const url = `${apiUrl}:${PORT}/offers`;
  return axios.get(url);
};

export const getCitiesDataFromApi = (): Promise<AxiosResponse<Record<City, Coordinates>>> => {
  const url = `${apiUrl}:${PORT}/cities`;
  return axios.get(url);
};

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
  const imagesString = images?.join(' ');
  const premiumString = premium ? Booleans.true : Booleans.false;
  const selectedString = selected ? Booleans.true : Booleans.false;
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
};

const getCoordValue = (value: string | number): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return 0;
};

export const createOffer = (offer: Offer, cities: Record<City, Coordinates>):Offer => {
  const citiesArray = Object.keys(cities);
  const city = citiesArray[faker.number.int({ min: 0, max: 5 })];
  const coords = cities[city as City];
  return ({
    ...Object.keys(offer).reduce((acc, key) => ({
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
      lat: getCoordValue(coords.lat) - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
      long: getCoordValue(coords.long) - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
    },
    amenities: Object.keys(Amenities)[faker.number.int({ min: 0, max: 7 })] as Amenities,
    propertyType: Object.keys(Property)[faker.number.int({ min: 0, max: 3 })] as Property,
  });
};

export const generateFakeOffersData = (n = 100, fileName: string) => {
  const fileWriter = new FileWriter(path.resolve('mocks', fileName));
  fileWriter.on('finish', () => console.log('Запись завершена'));
  fileWriter.on('error', () => console.log('Ошибка записи'));
  fileWriter.on('finish', () => console.log('Событие drain'));

  return getCitiesDataFromApi()
    .then(({ data: cities }) => getOffersDataFromApi()
      .then(({ data }) => {
        const offerString = Array(n).fill(data).map((i) => getTSVStringFromOfferObject(createOffer(i, cities))).join('\n');
        fileWriter.write(offerString);
      })
    );
};
