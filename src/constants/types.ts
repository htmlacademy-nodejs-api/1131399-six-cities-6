import { Amenities, City, Property } from './enums.js';
import type { User } from '../shared/types/user.type.js';

export type Coordinates = {
  lat: string | number;
  long: string | number;
}

export type Offer = {
  title: string | null;
  description: string | null;
  date: Date | null;
  city: City | string | null;
  previewImg: string | null;
  images: string[] | null;
  premium: boolean | null;
  selected: [];
  rating: number | null;
  propertyType: Property | null;
  roomsCount: number | null;
  guestsCount: number | null;
  price: number | null;
  amenities: (keyof typeof Amenities)[] | null;
  athour: User | null;
  comments: string[] | null;
  coords: Coordinates | null;
}

export enum Booleans {
  true = 'true',
  false = 'false'
}
