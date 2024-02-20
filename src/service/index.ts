import path from 'node:path';
import axios, { AxiosResponse } from 'axios';
import { faker } from '@faker-js/faker';
import { PORT, apiUrl } from './constants.js';
import { Booleans, Coordinates, Offer } from '../constants/types.js';
import { Amenities, Property, City } from '../constants/enums.js';
import { FileWriter } from '../shared/libs/file-writer/file-writer.js';
import { User, UserType } from '../shared/types/user.type.js';

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
  const authorString = JSON.stringify(athour);
  const amenitiesString = amenities?.join(',');
  const coordsString = JSON.stringify(coords);
  const selectedString = JSON.stringify(selected);
  const commentString = JSON.stringify(comments);
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
    amenitiesString,
    authorString,
    commentString,
    coordsString
  }).join('\t');
  return string;
};

const getFakeUser = (): User => {
  const name = faker.person.fullName();
  const email = faker.internet.email({
    allowSpecialCharacters: true,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    provider: faker.internet.domainName()
  });
  const avatar = faker.internet.avatar();
  const password = faker.internet.password({
    length: faker.number.int({ min: 6, max: 12 }),
  });
  const selected: string[] = [];
  const type: User['type'] = [UserType.standard, UserType.pro][faker.number.int({ min: 0, max: 1 })];

  return ({
    name,
    email,
    avatar,
    password,
    type,
    selected,
  });
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
const AmenitiesArray = Object.keys(Amenities) as (keyof typeof Amenities)[];

export const createOffer = (offer: Offer, cities: Record<City, Coordinates>):Offer => {
  const citiesArray = Object.keys(cities);
  const city = citiesArray[faker.number.int({ min: 0, max: 5 })];
  const coords = cities[city as City];
  const athour = getFakeUser();
  const amenities = [...new Set(Array(faker.number.int({ min: 0, max: 7 }))
    .fill('')
    .map(() => Amenities[AmenitiesArray[faker.number.int({ min: 0, max: 7 })]]))] as (keyof typeof Amenities)[];

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
    comments: [],
    athour,
    city,
    roomsCount: faker.number.int({ min: 1, max: 8 }),
    guestsCount: faker.number.int({ min: 1, max: 10 }),
    premium: !!faker.number.int({ min: 0, max: 1 }),
    selected: [],
    rating: faker.number.int({ min: 1, max: 5 }),
    price: faker.number.int({ max: 100000, min: 100}),
    coords: {
      lat: getCoordValue(coords.lat) - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
      long: getCoordValue(coords.long) - faker.number.float({ min: -0.1, max: 0.1, precision: 0.001 }),
    },
    amenities,
    propertyType: Object.keys(Property)[faker.number.int({ min: 0, max: 3 })] as Property,
  });
};

export const generateFakeOffersData = (n = 100, fileName: string) => {
  const fileWriter = new FileWriter(path.resolve('mocks', fileName));
  fileWriter.on('finish', () => console.log('Запись завершена'));
  fileWriter.on('error', () => console.log('Ошибка записи'));

  return getCitiesDataFromApi()
    .then(({ data: cities }) => getOffersDataFromApi()
      .then(({ data }) => {
        const offerString = Array(n).fill(data).map((i) => getTSVStringFromOfferObject(createOffer(i, cities))).join('\n');
        fileWriter.write(offerString);
      }).catch((error) => console.error(error.message))
    ).catch((error) => console.error(error.message));
};
