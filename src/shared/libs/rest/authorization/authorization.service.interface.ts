
export type CreateTokenDtoType = {
  email: string;
  password: string;
  id: string;
}

export interface IAuthorizationService {
  createToken(dto: CreateTokenDtoType): Promise<string>
}
