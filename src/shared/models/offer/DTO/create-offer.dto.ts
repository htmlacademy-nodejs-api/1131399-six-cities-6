import { Coordinates } from '../../../types/offer.type.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: string;
  public previewImg!: string;
  public images!: string[];
  public premium!: boolean;
  public selected!: boolean;
  public rating!: number;
  public propertyType!: string;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public amenities!: string;
  public athour!: string;
  public comments!: string[];
  public coords!: Coordinates;
}
