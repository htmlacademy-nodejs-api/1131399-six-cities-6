import { City } from './enums.js';
import { Coordinates } from './types.js';

export const cities: Record<City, Coordinates> = {
  Paris: {
    lat: '48.85661',
    long: '2.351499'
  },
  Cologne: {
    lat: '50.938361',
    long: '6.959974'
  },
  Brussels: {
    lat: '50.846557',
    long: '4.351697'
  },
  Amsterdam: {
    lat: '52.370216',
    long: '4.895168'
  },
  Hamburg: {
    lat: '53.550341',
    long: '10.000654'
  },
  Dusseldorf: {
    lat: '51.225402',
    long: '6.776314'
  },
};

export const PATH_TO_LOG_FILE = 'logs/application.log';

export const TEST_DB_PORT = '27017';

export const TEST_USER_PASSWORD = '123456';

export const boundaries = {
  offer: {
    title: {
      minLength: 10,
      maxLength: 100,
    },
    description: {
      minLength: 20,
      maxLength: 1024,
    },
    roomsCount: {
      min: 1,
      max: 8
    },
    guestsCount: {
      min: 1,
      max: 10,
    },
    price: {
      min: 100,
      max: 100000
    },
    coordinates: {
      min: 0,
      max: 6
    },
    rating: {
      min: 1,
      max: 5,
      from: 0,
      to: 1
    }
  },
  comment: {
    text: {
      minLength: 5,
      maxLength: 1024
    }
  },
  user: {
    name: {
      minLength: 1,
      maxLength: 15
    },
    password: {
      minLength: 6,
      maxLength: 12
    },
  }
};
