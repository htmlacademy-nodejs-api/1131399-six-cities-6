import { Coordinates } from '../../../types/offer.type.js';

export class UpdateOfferDto {
  public id?: string;
  public title?: string | null;
  public description?: string | null;
  public date?: Date | null;
  public city?: string | null;
  public previewImg?: string | null;
  public images?: string[] | null;
  public premium?: boolean | null;
  public selected?: string[] | null;
  public rating?: number | null;
  public propertyType?: string | null;
  public roomsCount?: number | null;
  public guestsCount?: number | null;
  public price?: number | null;
  public amenities?: string | null;
  public athour?: string | null;
  public comments?: string[] | null;
  public coords?: Coordinates | null;
}
