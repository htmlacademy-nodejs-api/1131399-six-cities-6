import * as jose from 'jose';
import crypto from 'node:crypto';
import { CreateTokenDtoType, IAuthorizationService } from "./authorization.service.interface.js";
import { algorythm } from './constants.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { IConfig } from '../../config/config.interface.js';
import { RestSchema } from '../../config/rest.schema.js';

@injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
  ) {}
  public async createToken(dto: CreateTokenDtoType): Promise<string> {
    const secret = crypto.createSecretKey(this.config.get('JWT_SECRET'), 'utf-8');
    const jwt = await new jose.SignJWT(dto)
      .setProtectedHeader({ alg: algorythm })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret);
    return jwt;
  }
}
