export class CreateCommentDto {
  public text!: string;
  public raiting!: number;
  public author!: string;
  public offerId!: string;
}

export class UpdateCommentDto {
  public text!: string;
  public raiting!: number;
  public author!: string;
  public offerId!: string;
}
