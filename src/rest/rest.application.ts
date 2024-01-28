import { injectable, inject } from 'inversify';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
  ){}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`The application starts on port: ${this.config.get('PORT')}`);
  }
}
