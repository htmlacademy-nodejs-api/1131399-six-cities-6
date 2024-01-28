import { IConfig } from '../shared/libs/config/config.interface.js';
import { ILogger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly logger: ILogger,
    private readonly config: IConfig
  ){}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`The application starts on port: ${this.config.get('PORT')}`);
  }
}
