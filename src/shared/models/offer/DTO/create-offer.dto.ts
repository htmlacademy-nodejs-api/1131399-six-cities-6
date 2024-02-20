import { Coordinates } from '../../../types/offer.type.js';
import { User } from '../../../types/user.type.js';

export class CreateOfferDto {
  public title!: string | null;
  public description!: string | null;
  public date!: Date | null;
  public city!: string | null;
  public previewImg!: string | null;
  public images!: string[] | null;
  public premium!: boolean | null;
  public selected!: string[];
  public rating!: number | null;
  public propertyType!: string | null;
  public roomsCount!: number | null;
  public guestsCount!: number | null;
  public price!: number | null;
  public amenities!: string[] | null;
  public athour!: User | null;
  public comments!: string[] | null;
  public coords!: Coordinates | null;
}
