import { Amenities, City, Property } from "./enums.js";

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImg: string;
  images: string[];
  premium: boolean;
  selected: boolean;
  rating: number;
  propertyType: Property;
  roomsCount: number;
  guestsCount: number;
  price: number;
  amenities: Amenities;
  athour: string;
  comments: string[];
  coords: Coordinates
}

export type Coordinates = {
  lat: string;
  long: string;
}
